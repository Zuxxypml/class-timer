"use client";

import React, { useState } from "react";
import { useStopwatch } from "@/hooks/useStopwatch";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import styles from "./Stopwatch.module.css";

export default function Stopwatch() {
  const { displayTime, isRunning, start, pause, reset, formatTime, addTime } =
    useStopwatch();

  useDocumentTitle(formatTime(displayTime), isRunning);

  const [showAddTimeInput, setShowAddTimeInput] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");

  const handleAddCustomTime = () => {
    const mins = parseInt(customMinutes) || 0;
    if (mins > 0) {
      addTime(mins);
      setCustomMinutes("");
      setShowAddTimeInput(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.timerDisplay}>
        <span>{formatTime(displayTime)}</span>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={start}
          disabled={isRunning}
        >
          {isRunning ? "Running" : "Start"}
        </button>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={pause}
          disabled={!isRunning}
        >
          Pause
        </button>
        <button className={`${styles.btn} ${styles.btnDanger}`} onClick={reset}>
          Reset
        </button>
        <button
          className={`${styles.btn} ${styles.btnAdd}`}
          onClick={() => setShowAddTimeInput(!showAddTimeInput)}
        >
          + Time
        </button>
      </div>

      {showAddTimeInput && (
        <div className={styles.addTimeContainer}>
          <input
            type="number"
            min="1"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            placeholder="Enter minutes"
            className={styles.addTimeInput}
            autoFocus
          />
          <button
            className={`${styles.btn} ${styles.btnAdd}`}
            onClick={handleAddCustomTime}
          >
            Add
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => {
              setShowAddTimeInput(false);
              setCustomMinutes("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
