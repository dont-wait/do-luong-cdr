import React, { useState, useEffect, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { FormattedCell, Class } from "../../../../types/types";
import {
  handleFormatData,
  handleFormattoJSON,
  postData,
} from "../../../../utils/helps";
import { useToast } from "../../../../hook/useToast";

interface SheetProps {
  worksheet: XLSX.WorkSheet | undefined;
  workbook: XLSX.WorkBook | undefined;
  selectedClass: Class;
  setClassId: (id: string) => void;
}

const Sheet: React.FC<SheetProps> = ({
  worksheet,
  workbook,
  selectedClass,
  setClassId,
}) => {
  const [data, setData] = useState<{
    header: FormattedCell[][];
    data: FormattedCell[][];
  }>({ header: [], data: [] });
  const { showToast } = useToast();

  useEffect(() => {
    if (worksheet) {
      setData(handleFormatData(worksheet));
    }
  }, [worksheet]);

  // Handle cell value change: update state and worksheet
  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    newValue: string
  ) => {
    setData((prev) => {
      const updated: typeof prev = {
        header: prev.header,
        data: prev.data.map((row, r) =>
          row.map((cell, c) =>
            r === rowIndex && c === cellIndex
              ? { ...cell, value: newValue }
              : cell
          )
        ),
      };

      // Also update the underlying worksheet if available
      if (worksheet) {
        const headerRows = prev.header.length;
        const excelRow = rowIndex + headerRows; // zero-based
        const excelCol = cellIndex;
        const address = XLSX.utils.encode_cell({ r: excelRow, c: excelCol });
        const cell = worksheet![address] || {};
        // Preserve original type if possible, else treat as string
        worksheet![address] = {
          ...cell,
          v: newValue,
          t: "s",
        };
      }

      return updated;
    });
  };

  // Export current data (including updated worksheet) to Excel
  const exportToExcel = () => {
    if (!worksheet) return;
    const worksheetData = [
      ...data.header.map((row) => row.map((cell) => cell.value || "")),
      ...data.data.map((row) => row.map((cell) => cell.value || "")),
    ];
    const newSheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Copy merges from original data
    const merges: XLSX.Range[] = [];
    [...data.header, ...data.data].forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        const rowspan = cell.rowspan ?? 1;
        const colspan = cell.colspan ?? 1;
        if (rowspan > 1 || colspan > 1) {
          merges.push({
            s: { r: rIdx, c: cIdx },
            e: { r: rIdx + rowspan - 1, c: cIdx + colspan - 1 },
          });
        }
      });
    });
    newSheet["!merges"] = merges;

    const newWb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWb, newSheet, "Sheet1");
    XLSX.writeFile(newWb, "modified_data.xlsx");
  };

  return (
    <div className='bg-white'>
      <table className='overflow-y-auto bg-white'>
        <thead>
          {data.header.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <th
                  key={c}
                  rowSpan={cell.rowspan}
                  colSpan={cell.colspan}
                  className='text-center p-2 bg-gray-800 text-white border'>
                  {cell.value ?? ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.data.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  rowSpan={cell.rowspan}
                  colSpan={cell.colspan}
                  className='text-center p-2 border border-gray-500'>
                  <input
                    type='text'
                    value={cell.value ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleCellChange(r, c, e.target.value)
                    }
                    className='w-full text-center border-none focus:outline-none'
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex items-center p-2'>
        <button
          onClick={exportToExcel}
          className='mt-4 px-4 py-2 m-3 bg-blue-600 text-white rounded'>
          Save & Export to Excel
        </button>
        <button
          onClick={async () => {
            try {
              await postData(
                "/cdr/SaveData",
                await handleFormattoJSON(selectedClass, workbook)
              );
              showToast("Submit Success!", "success");
              setClassId(selectedClass.id);
            } catch {
              showToast("Submit Error!", "error");
            }
          }}
          className='mt-4 px-4 py-2 m-3 bg-blue-600 text-white rounded'>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Sheet;
