"use client";

import React, { useState } from "react";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import styles from "./Countdown.module.css";

export default function Countdown() {
  const {
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
  } = useCountdownTimer();

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
      <div className={styles.timerInput}>
        <div className={styles.inputGroup}>
          <label htmlFor="countdown-hours">Hours</label>
          <input
            id="countdown-hours"
            type="number"
            min="0"
            max="24"
            value={hours}
            onChange={(e) =>
              handleInputChange("hours", parseInt(e.target.value) || 0)
            }
            disabled={isRunning}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="countdown-minutes">Minutes</label>
          <input
            id="countdown-minutes"
            type="number"
            min="0"
            max="60"
            value={minutes}
            onChange={(e) =>
              handleInputChange("minutes", parseInt(e.target.value) || 0)
            }
            disabled={isRunning}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="countdown-seconds">Seconds</label>
          <input
            id="countdown-seconds"
            type="number"
            min="0"
            max="60"
            value={seconds}
            onChange={(e) =>
              handleInputChange("seconds", parseInt(e.target.value) || 0)
            }
            disabled={isRunning}
          />
        </div>
      </div>

      <div className={styles.timerDisplay}>
        <span>{formatTime(displayTime)}</span>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={start}
          disabled={isRunning}
        >
          Start
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
