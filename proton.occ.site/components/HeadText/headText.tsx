import React, { FC } from "react";
import styles from "./headText.module.scss";

interface HeadTextProps {}

const HeadText: FC<HeadTextProps> = () => (
  <div className={styles.HeadText}>
    <div className={styles.title}>
      Open-Source, Built & Owned by the Community From Day 0.
    </div>
    <div>
      <div>
        <a
          href="https://network.occ.site/#/room/#project-proton:matrix.org"
          target="blank"
        >
          <button className={styles.button}>Join Community (Beta)</button>
        </a>
        <a
          href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xD17549214EE159A81F4EABa94c3B01118191c675"
          target="blank"
        >
          <button className={styles.button}>Swap $PRTN</button>
        </a>
      </div>
    </div>
  </div>
);

export default HeadText;
