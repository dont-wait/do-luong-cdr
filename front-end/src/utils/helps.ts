import * as XLSX from "xlsx";
import { FormattedCell, MergedCell } from "../types/types";
import axios from "../api/axios";

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

  return {
    header,
    data,
  };
}

export const fetchData = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch {
    throw new Error("fetch data fail!");
  }
};
