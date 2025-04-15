import * as XLSX from "xlsx";
import { FormattedCell, MergedCell } from "../types/types";
import { apiClient } from "../api/axios";
import { STATE } from "../api/state";

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

  const data_redundants = data.filter((row) =>
    row.some((cell) => cell.isHeading === true)
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

function parseheader(
  cell: FormattedCell,
  header: FormattedCell[][]
): string[] | Record<string, Record<string, string[]>> {
  const keys: FormattedCell[] = [];
  const label = cell.value;
  const res: string[] | Record<string, Record<string, string[]>> = label
    ? {}
    : [];
  const nOfRows = header.length;
  const currCell = cell;
  let currRowIdx = 0;
  let nextRowIdx = currCell.rowspan ?? 1;
  const info = new Map<string, string[]>();

  while (currRowIdx + nextRowIdx < nOfRows) {
    let currColIdx = currCell.colspan ?? 1;
    let s: FormattedCell | undefined;

    if (!label) {
      while (currColIdx) {
        s = header[nextRowIdx].shift();
        (res as string[]).push(
          s?.value ? s.value.toString() : JSON.stringify(s?.value)
        );
        currColIdx -= s?.colspan ?? 1;
      }
    } else {
      if (currRowIdx === 0) {
        while (currColIdx) {
          s = header[nextRowIdx].shift();
          if (s) keys.push(s);
          if (s?.value) info.set(s.value.toString(), []);
          currColIdx -= s?.colspan ?? 1;
        }
      } else {
        keys.forEach((key) => {
          currColIdx = key.colspan ?? 1;
          while (currColIdx) {
            s = header[nextRowIdx].shift();
            if (s?.value && key.value) {
              info.get(key.value.toString())?.push(JSON.stringify(s.value));
            }
            currColIdx -= s?.colspan ?? 1;
          }
        });
      }

      if (nextRowIdx === nOfRows - 2) {
        keys.forEach((key) => {
          currColIdx = key.colspan ?? 1;
          while (currColIdx) {
            s = header[nextRowIdx + 1].shift();
            if (s?.value && key.value) {
              info.get(key.value.toString())?.push(JSON.stringify(s.value));
            }
            currColIdx -= s?.colspan ?? 1;
          }
        });
      }

      // Chuyển Map về Object
      (res as Record<string, any>)[label] = Object.fromEntries(info);
    }

    currRowIdx = nextRowIdx;
    nextRowIdx += s?.rowspan ?? 1;
  }

  return res;
}

interface HeaderTree {
  [key: string]: number | string | HeaderTree | null;
}

const buildTree = (
  headers: (string[] | Record<string, Record<string, string[]>>)[]
): HeaderTree => {
  const tree: HeaderTree = {};
  headers.forEach((header) => {
    if (Array.isArray(header)) {
      header.forEach((key) => {
        tree[key] = null;
      });
    } else {
      Object.entries(header).forEach(([key, value]) => {
        tree[key] = {};
        Object.entries(value).forEach(([subKey, subValue]) => {
          (tree[key] as HeaderTree)[subKey] = subValue.length
            ? parseFloat(subValue[0])
            : [];
        });
      });
    }
  });

  return tree;
};

const mapDataToTree = (
  tree: HeaderTree,
  rowData: FormattedCell[]
): Record<string, any> => {
  let index = 0; // Biến đếm vị trí dữ liệu trong rowData

  const traverse = (node: HeaderTree | number | string | null): any => {
    if (node === null) {
      return rowData[index++]?.value ?? null; // Gán giá trị từ rowData
    }
    if (typeof node === "number" || typeof node === "string") {
      return rowData[index++]?.value ?? "null";
    }
    if (typeof node === "object") {
      const obj: Record<string, any> = {};
      Object.entries(node).forEach(([key, value]) => {
        obj[key] = traverse(value); // Đệ quy để duyệt hết cây
      });
      return obj;
    }
    return null;
  };

  return traverse(tree);
};

function transform(headers: any[][]) {
  const [row0, row1, row2, row3] = headers;

  const fixedCount = row0[0].value === null ? row0[0].colspan : 0;

  const fixedHeaders = row2.slice(0, fixedCount).map((cell) => cell.value);
  const result: any[] = [fixedHeaders];

  // Tính start-end index cho mỗi nhóm trong row0
  const groups = row0
    .slice(1)
    .filter((cell) => cell.value !== null)
    .map((cell) => ({
      name: cell.value.split(" (")[0],
      colspan: cell.colspan,
    }));

  // Dàn phẳng row1 (CLOs)
  const flattenedCLOs = row1.flatMap((cell) => {
    const count = cell.colspan || 1;
    return Array(count).fill(cell.value);
  });

  // Lấy các điểm từ row3 (bỏ fixed)
  const flatPoints = row3.slice(fixedCount).map((cell) => cell.value);

  let start = 0;
  for (const group of groups) {
    const end = start + group.colspan;
    const cloGroup = flattenedCLOs.slice(start, end);
    const pointGroup = flatPoints.slice(start, end);

    const groupData: Record<string, string[]> = {};

    for (let i = 0; i < cloGroup.length; i++) {
      const clo = cloGroup[i];
      const point = pointGroup[i];
      if (!groupData[clo]) groupData[clo] = [];
      if (point != null) groupData[clo].push(point.toString());
    }

    result.push({ [group.name]: groupData });
    start = end;
  }

  // Điểm tổng
  const totalPoint = row2[fixedCount + flatPoints.length]?.value;
  if (totalPoint != null) {
    result.push({ "Điểm Số": { [totalPoint]: [] } });
  }

  return result;
}

export const handleFormattoJSON = (
  header: FormattedCell[][],
  data: FormattedCell[][]
) => {
  console.log(JSON.stringify(header));
  if (header.length === 1) return header[0].map((cell) => cell.value);
  console.log(transform(header));
  const copyHeader = header.map((row) => [...row]);
  const firstRow = copyHeader[0];

  const headerTree = buildTree(
    firstRow.map((cell) => parseheader(cell, copyHeader))
  );
  const dataTree = data.map((row) => mapDataToTree(headerTree, row));
  console.log(dataTree);
  return dataTree;
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
