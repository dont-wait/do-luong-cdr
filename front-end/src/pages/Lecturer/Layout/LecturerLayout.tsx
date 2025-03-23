import { Container } from "react-bootstrap";
import FileUpload from "../../../components/FileUpload";
import Sheet from "../components/Sheet/Sheet";
import { useState } from "react";

const LecturerLayout = () => {
  const [file, setFile] = useState<File>();

  return (
    <Container>
      <FileUpload files={file} setFiles={setFile} />
      <Sheet files={file} />
    </Container>
  );
};

export default LecturerLayout;
