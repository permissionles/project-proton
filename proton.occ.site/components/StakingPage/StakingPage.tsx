import BlueCard from "@components/BlueCard";
import WalletConnect from "@components/common/WalletConnect";
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
      console.log("Nishank getTotalTokenStaked: ", response);
    } catch (error) {
      console.log(error, "staked");
    }
  };

  const getTotalRewardsClaimed = async () => {
    try {
      let response = await StakingService.rewardsClaimed();
      console.log("reward-1", response);
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
          <StakeTokens />

          {isConnected && <UserStakes />}
        </div>
      </div>
    </>
  );
};

export default StakingPage;
