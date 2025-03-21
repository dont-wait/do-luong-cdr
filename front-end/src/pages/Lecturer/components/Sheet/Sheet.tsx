import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { FormattedCell } from "../../../../types/types";
import { handleFormatData } from "../../../../utils/helps";

interface SheetProps {
  files: File | undefined;
}

const Sheet = ({ files }: SheetProps) => {
  const [data, setData] = useState({
    header: [] as FormattedCell[][],
    data: [] as FormattedCell[][],
  });

  useEffect(() => {
    if (!files) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(files);
    reader.onload = (e) => {
      if (!e.target?.result) return;
      const workbook = XLSX.read(e.target.result, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      setData(handleFormatData(worksheet));
    };
  }, [files]);

  return (
    <table className='w-full overflow-y-auto'>
      <thead className='sticky top-0'>
        {data.header.map((row, rowIndex) => {
          console.log(data);
          return (
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
          );
        })}
      </thead>
      <tbody>
        {data.data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className='text-center p-2 bg-white roboto-300 border border-gray-500'>
                {cell.value !== null ? cell.value : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Sheet;
