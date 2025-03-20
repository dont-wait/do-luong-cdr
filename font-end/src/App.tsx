import AppRoutes from "./routes";
import { ToastProvider } from "./context/ToastProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}

// const [file, setFile] = useState<File>();
{
  /* <FileUpload files={file} setFiles={setFile} />
<Sheet files={file} /> */
}
export default App;
