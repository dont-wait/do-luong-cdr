import { Nav, Form } from "react-bootstrap";
import FileUpload from "../../../../components/FileUpload";
import Sheet from "../Sheet/Sheet";
import { useState, useEffect } from "react";
import { useToast } from "../../../../hook/useToast";
import * as XLSX from "xlsx";

const Upload = () => {
  const [file, setFile] = useState<File>();
  const [workbook, setWorkbook] = useState<XLSX.WorkBook>();
  const [sheetIdx, setSheetIdx] = useState<number>(0);
  const [isUpload, setIsUpload] = useState<boolean>(true);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [worksheet, setWorkSheet] = useState<XLSX.WorkSheet>();
  const { showToast } = useToast();

  useEffect(() => {
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        if (!e.target?.result) return;
        const wb = XLSX.read(e.target.result, { type: "array" });
        setWorkbook(wb);
        setSheetNames(wb.SheetNames);
        setWorkSheet(wb.Sheets[wb.SheetNames[0]]);
      };
      showToast("Read File Success!", "success");
    } catch {
      showToast("Read File Fail!", "error");
    } finally {
      setIsUpload(false);
    }
  }, [file, showToast]);

  useEffect(() => {
    if (workbook) {
      setWorkSheet(workbook.Sheets[workbook.SheetNames[sheetIdx]]);
    }
  }, [sheetIdx, workbook]);

  const displayDropBox = sheetNames.length > 0;

  return (
    <>
      <Nav className='p-2 flex justify-between shadow-sm sticky top-0 bg-white'>
        {displayDropBox && (
          <Form.Select
            onChange={(e) => setSheetIdx(Number(e.target.value))}
            className='p-2'
            style={{ width: "max(50px, 10vw)" }}>
            {sheetNames.map((sheetName, idx) => (
              <option key={idx} value={idx}>
                {sheetName}
              </option>
            ))}
          </Form.Select>
        )}
      </Nav>
      {isUpload ? (
        <FileUpload files={file} setFiles={setFile} />
      ) : (
        <Sheet worksheet={worksheet} />
      )}
    </>
  );
};

export default Upload;
