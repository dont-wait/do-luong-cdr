import * as XLSX from "xlsx";
import { Class, FormattedCell, MergedCell } from "../types/types";
import { apiClient } from "../api/axios";
import { STATE } from "../api/state";
import { get } from "react-hook-form";

export function handleFormatData(ws: XLSX.WorkSheet): {
  header: FormattedCell[][];
  data: FormattedCell[][];
} {
  const mergedCells = (ws["!merges"] || []) as MergedCell[];
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  const processedCells = new Set<string>();
  const header: FormattedCell[][] = [];
  const data: FormattedCell[][] = [];

  for (let row = range.s.r; row <= range.e.r; row++) {
    const rowData: FormattedCell[] = [];
    let isHeading = false;
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ c: col, r: row });

      if (processedCells.has(cellAddress)) continue;

      const cell = ws[cellAddress];
      const mergedCell = mergedCells.find(
        (m) => m.s.r <= row && row <= m.e.r && m.s.c <= col && col <= m.e.c
      );

      let cellValue = cell?.v ?? null;
      if (typeof cellValue === "number") {
        cellValue = parseFloat(cellValue.toFixed(2));
      }

      if (cell?.r) isHeading = true;

      let cellInfo: FormattedCell = {
        isHeading: row === range.s.r,
        value: cellValue,
      };

      if (mergedCell) {
        const startAddress = XLSX.utils.encode_cell(mergedCell.s);
        if (startAddress !== cellAddress) continue;

        if (!ws[cellAddress]?.v) isHeading = true;

        cellInfo = {
          ...cellInfo,
          rowspan: mergedCell.e.r - mergedCell.s.r + 1,
          colspan: mergedCell.e.c - mergedCell.s.c + 1,
        };

        // Mark all merged cells as processed
        for (let r = mergedCell.s.r; r <= mergedCell.e.r; r++) {
          for (let c = mergedCell.s.c; c <= mergedCell.e.c; c++) {
            processedCells.add(XLSX.utils.encode_cell({ r, c }));
          }
        }
      }
      cellInfo = {
        ...cellInfo,
        isHeading,
      };
      rowData.push(cellInfo);
    }

    if (rowData[0].isHeading) header.push(rowData);
    else data.push(rowData);
  }

  const data_redundants = data.filter(
    (row) => row.length !== data[data.length - 1].length
  );

  if (data_redundants) {
    data_redundants.forEach((data_redundant) => {
      header.push(data_redundant);
      const redundantIdx = data.indexOf(data_redundant);
      data.splice(redundantIdx, 1);
    });
  }

  return {
    header,
    data,
  };
}

function transform(headers: FormattedCell[][]) {
  const copyHeaders = headers.map((row) => [...row]);
  const [row0, row1, ...rows] = copyHeaders;
  const lastRow = rows[rows.length - 1];
  // loai bo o tong diem
  row0.pop();
  lastRow.pop();
  // tao group cap 1
  let groupLevel1: Record<string, Array<string | undefined>>;
  const groudLevel1Arr: Record<string, Array<string | undefined>>[] = [];
  for (let n = row1.length - 1; n >= 0; n--) {
    groupLevel1 = {};
    const key = row1[n].value;
    const value = lastRow.slice(
      lastRow.length - (row1[n].colspan ?? 1),
      lastRow.length
    );
    lastRow.splice(lastRow.length - (row1[n].colspan ?? 1), lastRow.length);
    if (key) {
      groupLevel1[key] = value.map((v) => v.value?.toString());
      groudLevel1Arr.unshift(groupLevel1);
    }
  }
  let groupLevel2: Record<string | number | symbol, object>;
  const groupLevel2Arr = [];
  // tao group cap 2
  for (let n = row0.length - 1; n >= 0; n--) {
    groupLevel2 = {};
    const key = row0[n].value?.toString()?.match(/Câu\s\d+/g);
    let idx = groudLevel1Arr.length - 1;
    let total = 0;
    const flag = row0[n].colspan ?? 1;
    while (total !== flag && idx >= 0) {
      const ks = Object.keys(groudLevel1Arr[idx]);
      ks.forEach((k) => {
        total += groudLevel1Arr[idx][k].length;
      });
      --idx;
    }
    const value = groudLevel1Arr.slice(idx + 1, groudLevel1Arr.length);
    groudLevel1Arr.splice(idx + 1, groudLevel1Arr.length);
    if (key) {
      const temp: Record<string, Array<string | undefined>> = {};
      value.forEach((v) => {
        const keys = Object.keys(v);
        keys.forEach((k) => {
          temp[k] = v[k];
        });
      });
      groupLevel2[key] = temp;
      groupLevel2Arr.unshift(groupLevel2);
    }
  }
  const firstCellColspan = row0[0].colspan ?? 1;
  const anotherInfos: (string | number | null)[] = [];
  for (let i = 0; i < firstCellColspan; i++) {
    anotherInfos.push(headers[2][i].value);
  }
  groupLevel2Arr.unshift(anotherInfos);
  return groupLevel2Arr;
}

function createColumnMap(headerData) {
  const map = {};
  const baseColumnsCount = headerData[0].length;
  let colIndex = baseColumnsCount; // bắt đầu từ cột sau phần thông tin cơ bản

  // Duyệt qua header từ index 1 trở đi (các câu)
  for (let i = 1; i < headerData.length; i++) {
    const questionObj = headerData[i];
    const questionName = Object.keys(questionObj)[0];
    const cloMapping = questionObj[questionName];

    // Mỗi key trong cloMapping đại diện cho 1 CLO với mảng các điểm tối đa cho các cột của nó
    for (const cloKey in cloMapping) {
      const maxArray = cloMapping[cloKey];
      for (let j = 0; j < maxArray.length; j++) {
        map[colIndex] = {
          question: questionName,
          clo: cloKey,
          max: parseFloat(maxArray[j]),
        };
        colIndex++;
      }
    }
  }
  return map;
}

function convertStudentRow(row, baseHeader, columnMap) {
  const result = {};

  // 1. Lấy thông tin cơ bản
  for (let i = 0; i < baseHeader.length; i++) {
    result[baseHeader[i]] = row[i] ? row[i].value : null;
  }

  // 2. Duyệt qua các cột còn lại và tổng hợp điểm
  // Cấu trúc tạm: { [questionName]: { clo: { [cloName]: { student: number, max: number } } } }
  const aggregated = {};

  for (let col = baseHeader.length; col < row.length; col++) {
    const cell = row[col];
    if (!cell || !columnMap[col]) continue;

    const { question, clo, max } = columnMap[col];
    const cellValue = parseFloat(cell.value);
    const score = isNaN(cellValue) ? 0 : cellValue;

    // Nếu câu này chưa có, khởi tạo
    if (!aggregated[question]) {
      aggregated[question] = { clo: {} };
    }
    // Nếu CLO này chưa có trong câu, khởi tạo
    if (!aggregated[question].clo[clo]) {
      aggregated[question].clo[clo] = { student: 0, max: 0 };
    }

    // Cộng dồn điểm sinh viên và điểm tối đa
    aggregated[question].clo[clo].student += score;
    aggregated[question].clo[clo].max += max;
  }

  // 3. Đưa thông tin tổng hợp vào result với key "Câu X (totalMax)"
  for (const question in aggregated) {
    let totalMaxForQuestion = 0;
    const cloResult = {};
    for (const clo in aggregated[question].clo) {
      const { student, max } = aggregated[question].clo[clo];
      cloResult[clo] = student; // ta chỉ lưu điểm sinh viên (theo yêu cầu)
      totalMaxForQuestion += max;
    }
    // Tạo key với format: "Câu X (totalMax)"
    const questionKey = `${question} (${totalMaxForQuestion})`;
    result[questionKey] = cloResult;
  }

  return result;
}

function convertData(headerData, data) {
  const baseHeader = headerData[0];
  const columnMap = createColumnMap(headerData);
  const resultArray = [];
  for (const row of data) {
    const obj = convertStudentRow(row, baseHeader, columnMap);
    resultArray.push(obj);
  }
  return resultArray;
}

interface Exam {
  id: string;
  exam_name: string;
}

export const handleFormattoJSON = async (
  selectedClass: Class,
  workbook: XLSX.WorkBook | undefined
) => {
  const examInfo: Exam[] = await getData(`exams/by-class/${selectedClass.id}`);
  const wsData = workbook?.SheetNames.map((name) =>
    handleFormatData(workbook.Sheets[name])
  );
  const examResults = wsData?.map((exam, idx) => {
    const header = transform(exam.header);
    const exam_id = examInfo.find(
      (exam) => exam.exam_name === workbook?.SheetNames[idx]
    )?.id;

    const res = {
      header,
      body: {
        exam_id,
        data: convertData(transform(exam.header), exam.data),
      },
    };
    return res;
  });
  return examResults;
};

export const getData = async (url: string) => {
  try {
    const res = await apiClient.get(url);
    console.log("GET response:", res);
    return STATE ? res.data : res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("fetch data fail!");
  }
};

export const postData = async (url: string, info: object | object[]) => {
  try {
    console.log("POSTing to:", url, "with data:", info);
    const res = await apiClient.post(url, info);
    console.log("POST response:", res);
    return STATE ? res.data : res.data.data;
  } catch {
    throw new Error("fetch data fail!");
  }
};

export const updateData = async (url: string, info: object) => {
  try {
    console.log("PUTting to:", url, "with data:", info);
    const res = await apiClient.put(url, info);
    console.log("PUT response:", res);
    return STATE ? res.data : res.data.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error("fetch data fail!");
  }
};

export const deleteData = async (url: string) => {
  try {
    console.log("DELETEing from:", url);
    const res = await apiClient.delete(url);
    console.log("DELETE response:", res);
    return STATE ? res.data : res.data.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("fetch data fail!");
  }
};
