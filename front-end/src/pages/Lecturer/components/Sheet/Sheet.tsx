import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { FormattedCell, Class } from "../../../../types/types";
import {
  handleFormatData,
  handleFormattoJSON,
  postData,
} from "../../../../utils/helps";

interface SheetProps {
  worksheet: XLSX.WorkSheet | undefined;
  workbook: XLSX.WorkBook | undefined;
  selectedClass: Class;
}

const Sheet = ({ worksheet, workbook, selectedClass }: SheetProps) => {
  const [data, setData] = useState({
    header: [] as FormattedCell[][],
    data: [] as FormattedCell[][],
  });

  useEffect(() => {
    if (worksheet) setData(handleFormatData(worksheet));
  }, [worksheet]);

  // Hàm xử lý thay đổi giá trị ô
  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    newValue: string
  ) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.data[rowIndex][cellIndex] = {
        ...updatedData.data[rowIndex][cellIndex],
        value: newValue,
      };
      return updatedData;
    });
  };

  // Hàm xuất dữ liệu ra Excel với giữ nguyên merge cells
  const exportToExcel = () => {
    const worksheetData = [
      ...data.header.map((row) => row.map((cell) => cell.value || "")),
      ...data.data.map((row) => row.map((cell) => cell.value || "")),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Xử lý merge cells
    const merges: XLSX.Range[] = [];
    [...data.header, ...data.data].forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if ((cell.rowspan ?? 1) > 1 || (cell.colspan ?? 1) > 1) {
          merges.push({
            s: { r: rowIndex, c: cellIndex },
            e: {
              r: rowIndex + (cell.rowspan || 1) - 1,
              c: cellIndex + (cell.colspan || 1) - 1,
            },
          });
        }
      });
    });

    worksheet["!merges"] = merges;

    // Xuất file Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "modified_data.xlsx");
  };

  return (
    <div className='bg-white'>
      <table style={{ cursor: "pointer" }} className='overflow-y-auto bg-white'>
        <thead>
          {data.header.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <th
                  key={cellIndex}
                  rowSpan={cell.rowspan}
                  colSpan={cell.colspan}
                  className='text-center p-2 bg-gray-800 text-white roboto-600 border'>
                  {cell.value !== null ? cell.value : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  rowSpan={cell.rowspan}
                  colSpan={cell.colspan}
                  className='text-center p-2 bg-white roboto-300 border border-gray-500'>
                  <input
                    type='text'
                    value={cell.value !== null ? cell.value : ""}
                    onChange={(e) =>
                      handleCellChange(rowIndex, cellIndex, e.target.value)
                    }
                    className='w-full text-center border-none focus:outline-none'
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex align-middle p-2'>
        <button
          onClick={exportToExcel}
          className='mt-4 px-4 py-2 m-3 bg-blue-600 text-white rounded'>
          Save & Export to Excel
        </button>

        <button
          onClick={async () => {
            postData(
              "/cdr/SaveData",
              await handleFormattoJSON(selectedClass, workbook)
            );
          }}
          className='mt-4 px-4 py-2 m-3 bg-blue-600 text-white rounded'>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Sheet;
