"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Made with <span className={styles.heart}>❤️</span> by{" "}
        <a
          href="https://github.com/Zuxxypml/class-timer"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Basit
        </a>
      </p>
    </footer>
  );
}
