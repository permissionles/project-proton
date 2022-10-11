import React, { FC } from "react";
import styles from "./AText.module.scss";

interface ATextProps {}

const AText: FC<ATextProps> = () => (
  <div className={styles.AText}>
    <div className={styles.title}>Built with & for the future of work :)</div>
    <a href="https://async.network" target="blank">
      <button className={styles.button}>know more about async.network</button>
    </a>
  </div>
);

export default AText;
