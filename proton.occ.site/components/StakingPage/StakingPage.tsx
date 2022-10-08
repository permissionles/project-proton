import BlueCard from "@components/common/BlueCard";
import { DynamicIcon } from "@components/ui/icon";
import AppConfig from "@config/appConfig";
import { Form } from "antd";
import { round } from "mathjs";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { MiscService, StakingService } from "services";
import { authAtom } from "src/_state";
import Web3 from "web3";
import StakeTokens from "./StakeTokens";
import s from "./StakingPage.module.scss";
import UserStakes from "./UserStakes";

const StakingPage: FC = () => {
  const auth = useRecoilValue(authAtom);

  const [form] = Form.useForm();
  const [tokenData, setTokenData] = useState({
    totalStaked: "",
    totalRewardsClaimed: "",
    tokenRate: "",
  });

  const getTotalTokenStaked = async () => {
    try {
      let response = await MiscService.balanceOf(
        AppConfig.contract.krl.token.address,
        AppConfig.contract.krl.staking.address
      );
      response = Web3.utils.fromWei(response, "ether");
      setTokenData((value: any) => {
        return {
          ...value,
          totalStaked: round(response, 2),
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalRewardsClaimed = async () => {
    try {
      let response = await StakingService.rewardsClaimed();
      response = Web3.utils.fromWei(response, "ether");

      setTokenData((value: any) => {
        return {
          ...value,
          totalRewardsClaimed: round(response, 2),
        };
      });
    } catch (error) {
      console.log(error);
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
              src={"/images/stock-title.png"}
              alt="Stock Bg"
              height={500}
              width={1000}
            />
          </div>

          <div className={`${s.cardsRow}`}>
            <BlueCard
              textLine1="Overall "
              textLine2={`Stocked ${AppConfig.tokenName}`}
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
              textLine1={`${AppConfig.tokenName}`}
              textLine2="Price"
              type="small"
              textLine3={tokenData.tokenRate}
            />
          </div>

          <StakeTokens />

          {auth?.address && <UserStakes />}
        </div>
        <div className={`${s.faqSection} text-center`}>
          <div className={`${s.faq}`}>
            <DynamicIcon type="Chat" />
            <span className="blue">FAQ</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingPage;
