import * as XLSX from "xlsx";
import { FormattedCell, MergedCell, Obj } from "../types/types";
import axios from "../api/axios";
import { STATE } from "../api/state";
import { MdCleaningServices } from "react-icons/md";

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

function parseTableData(
  cell: FormattedCell,
  header: FormattedCell[][]
): unknown {
  const keys: FormattedCell[] = [];
  const label = cell.value;
  const res: unknown = label ? {} : [];
  const nOfRows = header.length;
  const currCell = cell;
  let currRowIdx = 0;
  let nextRowIdx = 0 + (currCell.rowspan ?? 1);
  const info: Record<string, any> = {};

  while (currRowIdx + nextRowIdx < nOfRows) {
    let currColIdx = currCell.colspan ?? 1;
    let s;
    if (!label) {
      while (currColIdx) {
        s = header[nextRowIdx].shift();
        (res as string[]).push(
          typeof s?.value === "string"
            ? s?.value?.toString()
            : JSON.stringify(s?.value)
        );
        currColIdx -= s?.colspan ?? 1;
      }
    } else {
      if (currRowIdx === 0) {
        while (currColIdx) {
          s = header[nextRowIdx].shift();
          if (s) keys.push(s);
          if (s?.value) info[s?.value?.toString()] = [];
          currColIdx -= s?.colspan ?? 1;
        }
      } else {
        keys.forEach((key) => {
          currColIdx = key.colspan ?? 1;
          while (currColIdx) {
            s = header[nextRowIdx].shift();
            if (s?.value && key.value) {
              info[key.value][Math.abs(currColIdx - (key.colspan ?? 1))] =
                JSON.stringify(s?.value);
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
              info[key.value][Math.abs(currColIdx - (key.colspan ?? 1))] =
                JSON.stringify(s?.value);
            }
            currColIdx -= s?.colspan ?? 1;
          }
        });
      }

      (res as Record<string, any>)[label] = info;
    }

    const tmp = nextRowIdx;
    currRowIdx = tmp;
    nextRowIdx = tmp + (s?.rowspan ?? 1);
  }

  return res;
}

export const handleFormattoJSON = (
  header: FormattedCell[][],
  data: FormattedCell[][]
) => {
  if (header.length === 1) return header[0].map((cell) => cell.value);

  const copyHeader = header.map((row) => [...row]);
  const firstRow = copyHeader[0];
  const headerJSON = firstRow.map((cell) => parseTableData(cell, copyHeader));
  console.log(headerJSON);
  return headerJSON;

  console.log(data);
};

export const getData = async (url: string) => {
  try {
    const res = await axios.get(url);
    return STATE ? res.data : res.data.data;
  } catch {
    throw new Error("fetch data fail!");
  }
};

export const postData = async (url: string, info: Obj | Obj[]) => {
  try {
    const res = await axios.post(url, info);
    return STATE ? res.data : res.data.data;
  } catch {
    throw new Error("fetch data fail!");
  }
};

export const updateData = async (url: string, info: Obj | Obj[]) => {
  try {
    const res = await axios.put(url, info);
    return STATE ? res.data : res.data.data;
  } catch {
    throw new Error("fetch data fail!");
  }
};

export const deleteData = async (url: string) => {
  try {
    const res = await axios.delete(url);
    return STATE ? res.data : res.data.data;
  } catch {
    throw new Error("fetch data fail!");
  }
};
