import { useState, useRef, useEffect } from "react";

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);
  const [laps, setLaps] = useState<Array<{ id: number; time: string }>>([]);

  const startTimeRef = useRef(0);
  const elapsedRef = useRef(0);
  const lapCounterRef = useRef(1);
  const frameIdRef = useRef<number | null>(null);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const updateDisplay = () => {
      elapsedRef.current = Date.now() - startTimeRef.current;
      setDisplayTime(elapsedRef.current);
      frameIdRef.current = requestAnimationFrame(updateDisplay);
    };

    startTimeRef.current = Date.now() - elapsedRef.current;
    frameIdRef.current = requestAnimationFrame(updateDisplay);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
  };

  const pause = () => {
    if (!isRunning) return;
    setIsRunning(false);
  };

  const addLap = () => {
    const lapTime = formatTime(elapsedRef.current);
    setLaps((prev) => [...prev, { id: lapCounterRef.current, time: lapTime }]);
    lapCounterRef.current++;
  };

  const reset = () => {
    setIsRunning(false);
    elapsedRef.current = 0;
    setDisplayTime(0);
    setLaps([]);
    lapCounterRef.current = 1;
    if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
  };

  const addTime = (minutes: number) => {
    const additionalMs = minutes * 60 * 1000;
    elapsedRef.current += additionalMs;
    setDisplayTime(elapsedRef.current);
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedRef.current;
    }
  };

  return {
    displayTime,
    isRunning,
    laps,
    start,
    pause,
    addLap,
    reset,
    formatTime,
    addTime,
  };
};
