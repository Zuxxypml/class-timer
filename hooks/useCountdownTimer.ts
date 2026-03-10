import { useState, useRef, useEffect } from "react";

export const useCountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayTime, setDisplayTime] = useState(60000);

  const totalTimeRef = useRef(60000);
  const remainingRef = useRef(60000);
  const startTimeRef = useRef(0);
  const frameIdRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const playAlarm = () => {
    try {
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    const updateDisplay = () => {
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = totalTimeRef.current - elapsed;

      if (remainingRef.current <= 0) {
        remainingRef.current = 0;
        setDisplayTime(0);
        setIsRunning(false);
        hasStartedRef.current = false;
        playAlarm();
        alert("Time's up!");
        if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
        return;
      }

      setDisplayTime(remainingRef.current);
      frameIdRef.current = requestAnimationFrame(updateDisplay);
    };

    frameIdRef.current = requestAnimationFrame(updateDisplay);

    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    if (isRunning) return;
    // If this is the first start, initialize with input values
    if (!hasStartedRef.current) {
      const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
      if (totalMs <= 0) {
        alert("Please enter a valid time");
        return;
      }
      totalTimeRef.current = totalMs;
      remainingRef.current = totalMs;
      startTimeRef.current = Date.now();
      hasStartedRef.current = true;
    } else {
      // Resume from pause: adjust startTimeRef so elapsed calculation accounts for time already spent
      startTimeRef.current =
        Date.now() - (totalTimeRef.current - remainingRef.current);
    }
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
    if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
  };

  const reset = () => {
    setIsRunning(false);
    hasStartedRef.current = false;
    totalTimeRef.current =
      (hours * 3600 + minutes * 60 + seconds) * 1000 || 60000;
    remainingRef.current = totalTimeRef.current;
    setDisplayTime(totalTimeRef.current);
    if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
  };

  const addTime = (minutesToAdd: number) => {
    const additionalMs = minutesToAdd * 60 * 1000;
    totalTimeRef.current += additionalMs;
    remainingRef.current += additionalMs;
    setDisplayTime(remainingRef.current);
    if (isRunning) {
      startTimeRef.current =
        Date.now() - (totalTimeRef.current - remainingRef.current);
    }
  };

  const handleInputChange = (
    type: "hours" | "minutes" | "seconds",
    value: number,
  ) => {
    if (isRunning) return;
    let validValue = Math.max(0, value);
    if (type === "hours") {
      validValue = Math.min(24, validValue);
      setHours(validValue);
    } else if (type === "minutes") {
      validValue = Math.min(60, validValue);
      setMinutes(validValue);
    } else {
      validValue = Math.min(60, validValue);
      setSeconds(validValue);
    }
  };

  useEffect(() => {
    const totalMs = (hours * 3600 + minutes * 60 + seconds) * 1000 || 60000;
    // Only reset to input values if timer hasn't been started yet (fresh state)
    if (!hasStartedRef.current) {
      totalTimeRef.current = totalMs;
      remainingRef.current = totalMs;
      setDisplayTime(totalMs);
    }
  }, [hours, minutes, seconds]);

  return {
    hours,
    minutes,
    seconds,
    displayTime,
    isRunning,
    start,
    pause,
    reset,
    handleInputChange,
    formatTime,
    addTime,
  };
};
