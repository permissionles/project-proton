import { FC } from "react";
import s from "./StocksBeta.module.scss";

const PoolProgress: FC = () => {
  return (
    <div className={s.poolContainer}>
      <div className={s.total}>100,00,00,00</div>
      <div className={s.progress}>
        <span className={s.percent} style={{ width: "30%" }} />
      </div>
    </div>
  );
};

export default PoolProgress;
