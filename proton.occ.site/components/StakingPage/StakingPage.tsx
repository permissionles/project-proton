import BlueCard from "@components/BlueCard";
import ProtonConfig from "@config/ProtonConfig";
import { Form } from "antd";
import { ethers } from "ethers";
import { round } from "mathjs";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { MiscService, StakingService } from "services";
import { useAccount } from "wagmi";
import StakeTokens from "./StakeTokens";
import s from "./StakingPage.module.scss";
import UserStakes from "./UserStakes";

const StakingPage: FC = () => {
  const [form] = Form.useForm();
  const [tokenData, setTokenData] = useState({
    totalStaked: "",
    totalRewardsClaimed: "",
    tokenRate: "",
  });
  const { address, isConnected } = useAccount();

  const getTotalTokenStaked = async () => {
    try {
      let response = await MiscService.balanceOf(
        ProtonConfig.contract.proton.token.address,
        ProtonConfig.contract.proton.staking.address
      );
      response = ethers.utils.formatUnits(response, "ether");
      console.log("staked", response);

      setTokenData((value: any) => {
        return {
          ...value,
          totalStaked: round(response, 2),
        };
      });
    } catch (error) {
      console.log(error, "staked");
    }
  };

  const getTotalRewardsClaimed = async () => {
    try {
      let response = await StakingService.rewardsClaimed();
      response = ethers.utils.formatUnits(response, "ether");

      setTokenData((value: any) => {
        return {
          ...value,
          totalRewardsClaimed: round(response, 2),
        };
      });
      console.log("reward-1", response);
    } catch (error) {
      console.log(error, "reward1");
    }
  };

  useEffect(() => {
    getTotalTokenStaked();
    getTotalRewardsClaimed();
  }, []);

  return (
    <>
      <div className={`${s.compWrapper}`}>
        {/* <Header /> */}
        <div className={`${s.stakingPageContent}`}>
          <div className={s.stockBg}>
            <Image
              src={"/images/staking/stock-title.png"}
              alt="Stock Bg"
              height={500}
              width={1000}
            />
          </div>

          <div className={`${s.cardsRow}`}>
            <BlueCard
              textLine1="Overall "
              textLine2={`Stocked ${ProtonConfig.tokenName}`}
              textLine3={tokenData.totalStaked}
              type="small"
            />

            <BlueCard
              textLine1="Overall Stoking"
              textLine2="Rewards Generated"
              textLine3={tokenData.totalRewardsClaimed}
              type="small"
            />

            <BlueCard
              textLine1={`${ProtonConfig.tokenName}`}
              textLine2="Price"
              type="small"
              textLine3={tokenData.tokenRate}
            />
          </div>

          <StakeTokens />

          {isConnected && <UserStakes />}
        </div>
      </div>
    </>
  );
};

export default StakingPage;
