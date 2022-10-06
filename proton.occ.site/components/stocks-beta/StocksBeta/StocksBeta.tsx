/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import StackToken from "../StackToken";
import PoolProgress from "./PoolProgress";
import s from "./StocksBeta.module.scss";
import RewardList from "../RewardList";
import WalletConnect from "../../common/WalletConnect";

const StocksBeta: FC = () => {
  return (
    <div className={s.container}>
      <div className={s.banner}>
        <img src="/images/stocks-banner.svg" alt="" />
        <div className={s.wallet}>
          <WalletConnect />
        </div>
      </div>
      <div className={s.content}>
        <PoolProgress />
        <div className={s.stack}>
          <StackToken />
        </div>

        <RewardList />
      </div>
    </div>
  );
};

export default StocksBeta;
