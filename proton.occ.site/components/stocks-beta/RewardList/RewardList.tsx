/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { getRewardList } from "../../../services/StockService";
import AddReward from "../AddReward";
import { StockListData } from "./Data";
import RewardItem from "./RewardItem";
import s from "./RewardList.module.scss";

const RewardList: FC = () => {
  const [rewardData, setRewardData] = useState<any>([]);

  const getRewardData = async () => {
    try {
      const response = await getRewardList();
      setRewardData(response.data.data.rewards);
    } catch (error) {}
  };

  useEffect(() => {
    getRewardData();
  }, []);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img className={s.title} src="/images/reward-title.svg" alt="" />
        <AddReward />
      </div>
      {rewardData.map((item: any, i: number) => (
        <RewardItem data={item} key={i} />
      ))}
    </div>
  );
};

export default RewardList;
