"use client";

import React, { useState } from "react";
import Stopwatch from "./Stopwatch";
import Countdown from "./Countdown";
import styles from "./TimerApp.module.css";

export default function TimerApp() {
  const [activeTab, setActiveTab] = useState<"stopwatch" | "countdown">(
    "stopwatch",
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Timer App</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === "stopwatch" ? styles.active : ""}`}
          onClick={() => setActiveTab("stopwatch")}
        >
          Stopwatch
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "countdown" ? styles.active : ""}`}
          onClick={() => setActiveTab("countdown")}
        >
          Countdown
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "stopwatch" && <Stopwatch />}
        {activeTab === "countdown" && <Countdown />}
      </div>
    </div>
  );
}
