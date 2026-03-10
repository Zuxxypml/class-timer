import { useEffect } from "react";

export const useDocumentTitle = (title: string, isRunning: boolean) => {
  useEffect(() => {
    if (isRunning) {
      document.title = title;
    } else {
      document.title = "Stopwatch & Countdown Timer";
    }
  }, [title, isRunning]);
};
