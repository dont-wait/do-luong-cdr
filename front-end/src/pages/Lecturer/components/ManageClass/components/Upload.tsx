import { Nav, Form, Button } from "react-bootstrap";
import FileUpload from "../../../../../components/FileUpload";
import Sheet from "../../Sheet/Sheet";
import { useState, useEffect } from "react";
import { useToast } from "../../../../../hook/useToast";
import { Class } from "../../../../../types/types";
import * as XLSX from "xlsx";

interface UploadProps {
  selectedClass: Class;
}

const Upload = ({ selectedClass }: UploadProps) => {
  const [file, setFile] = useState<File>();
  const [workbook, setWorkbook] = useState<XLSX.WorkBook>();
  const [sheetIdx, setSheetIdx] = useState<number>(0);
  const [isUpload, setIsUpload] = useState<boolean>(true);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [worksheet, setWorkSheet] = useState<XLSX.WorkSheet>();
  const [zoom, setZoom] = useState(false);
  const { showToast } = useToast();

  const togglehanlde = () => {
    setZoom(!zoom);
  };

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
    <section
      className={`${zoom ? "fixed top-0 left-[256px] z-10 h-full" : ""}`}
      style={{ overflow: "auto" }}>
      <Nav className='p-2 flex justify-between shadow-sm sticky top-0 bg-white'>
        {displayDropBox && (
          <>
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

            <Button type='button' onClick={togglehanlde}>
              Zoom {zoom ? "in" : "out"}
            </Button>
          </>
        )}
      </Nav>
      {isUpload ? (
        <FileUpload files={file} setFiles={setFile} />
      ) : (
        <Sheet
          worksheet={worksheet}
          workbook={workbook}
          selectedClass={selectedClass}
        />
      )}
    </section>
  );
};

export default Upload;
