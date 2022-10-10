import { Spin } from "antd";
import { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { StakingService } from "../../services";

import { authAtom } from "../../src/_state";

import StakedItem, { StakingDataInterface } from "./StakedItem";
import s from "./StakingPage.module.scss";

const UserStakes: FC = () => {
  const auth = useRecoilValue(authAtom);
  const [isLoading, setIsLoading] = useState(false);

  const [userStakes, setUserStakes] = useState<StakingDataInterface[]>([]);

  const getUserStakes = async () => {
    try {
      setIsLoading(true);
      let tokenStakedCollection: StakingDataInterface[] =
        await StakingService.getStakes(auth?.address!!);

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
    <div className={s.myStakes}>
      <p className={`${s.feildTitle} f22 blue fm-26`}>MY STAKES</p>
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
