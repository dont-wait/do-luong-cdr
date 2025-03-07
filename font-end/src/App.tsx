import AppRoutes from "./routes";
import { ToastProvider } from "./context/ToastProvider";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}

export default App;
