import { Spin } from "antd";
import { FC, useEffect, useState } from "react";
import { StakingService } from "services";
import { useAccount } from "wagmi";
import StakedItem, { StakingDataInterface } from "./StakedItem";
import s from "./StakingPage.module.scss";

const UserStakes: FC = () => {
  const { address, isConnected } = useAccount();

  const [isLoading, setIsLoading] = useState(false);

  const [userStakes, setUserStakes] = useState<StakingDataInterface[]>([]);

  const getUserStakes = async () => {
    try {
      setIsLoading(true);
      let tokenStakedCollection: StakingDataInterface[] =
        await StakingService.getStakes(address!!);

      tokenStakedCollection = tokenStakedCollection.map((item, i) => {
        return {
          ...item,
          itemIndex: i,
        };
      });
      const nonCollectedStakes: StakingDataInterface[] =
        tokenStakedCollection.filter((item) => !item.collected);
      console.log("stakes", tokenStakedCollection);
      setUserStakes(nonCollectedStakes);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserStakes();
  }, []);

  return (
    <div className={`${s.myStakes} ${s.compWrapper} ${s.container}`}>
      <p className={`${s.feildTitle} f22 blue fm-26`}>MY STOCKS</p>
      <div className={s.stakeCardsRow}>
        {isLoading && <Spin />}
        {userStakes.map((item, i) => (
          <StakedItem
            key={i}
            stakingData={item}
            itemIndex={item.itemIndex}
            onUpdate={() => {
              getUserStakes();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UserStakes;
