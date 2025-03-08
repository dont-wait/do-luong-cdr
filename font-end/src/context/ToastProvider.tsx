// ToastContext.tsx
import { createContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextType {
  showToast: (message: string, type?: "error" | "success" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const showToast = (
    message: string,
    type: "error" | "success" | "info" = "error"
  ) => {
    switch (type) {
      case "error":
        toast.error(message, defaultOptions);
        break;
      case "success":
        toast.success(message, defaultOptions);
        break;
      case "info":
        toast.info(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
