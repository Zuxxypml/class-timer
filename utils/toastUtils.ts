import { toast } from "react-toastify";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" = "info",
) => {
  toast[type](message, {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showTimerAlert = (message: string) => {
  showToast(message, "success");
};

export const showErrorToast = (message: string) => {
  showToast(message, "error");
};
