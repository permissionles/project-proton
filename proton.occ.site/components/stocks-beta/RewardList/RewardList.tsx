/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { FC } from "react";
import AddReward from "../AddReward";
import { StockListData } from "./Data";
import s from "./RewardList.module.scss";

const RewardList: FC = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <img className={s.title} src="/images/reward-title.svg" alt="" />
        <AddReward />
      </div>
      {StockListData.map((item, i) => (
        <div key={i} className={s.list}>
          <div className={s.title}>
            <Image src={item.icon} width={40} height={40} alt="" />
            <span className={s.name}>{item.name}</span>
          </div>

          <span className={s.address}>
            {item.address.slice(0, 6)}...${item?.address.slice(-4)}
          </span>
          <span className={s.amount}>{item.amount}</span>
          <div className={`btn-prt ${s.action}`}>Claim</div>
        </div>
      ))}
    </div>
  );
};

export default RewardList;
