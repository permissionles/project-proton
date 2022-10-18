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
      console.log("Get User Stakes For ", address);

      // let myStakes = await StakingService.getStakes(address!);
      // console.log("My Stakes: ", myStakes);

      let tokenStakedCollection: StakingDataInterface[] =
        await StakingService.getStakes(address!!);

      tokenStakedCollection = tokenStakedCollection.map((item, i) => {
        return {
          ...item,
          itemIndex: i,
        };
      });
      console.log("Token Staked Collection: ", tokenStakedCollection);
      const nonCollectedStakes: StakingDataInterface[] =
        tokenStakedCollection.filter((item) => !item.collected);
      console.log("stakes", tokenStakedCollection);
      setUserStakes(nonCollectedStakes);
    } catch (error) {
      console.log("Error User Stakes: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserStakes();
  }, []);

  return (
    <div className={`${s.myStocks}`}>
      <p className={`${s.feildTitle}`}>My Stocks</p>
      <div className={s.stakeCardsRow}>
        {isLoading && <Spin />}
        {userStakes.length == 0 ? (
          <>You have no stocks</>
        ) : (
          userStakes.map((item, i) => (
            <StakedItem
              key={i}
              stakingData={item}
              itemIndex={item.itemIndex}
              onUpdate={() => {
                getUserStakes();
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserStakes;
