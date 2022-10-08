import BlueCard from "@components/common/BlueCard";
import AppConfig from "@config/appConfig";
import { Button, notification } from "antd";
import { round } from "mathjs";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { StakingService } from "services";
import { authAtom } from "src/_state";
import Misc from "utility/Misc";
import Web3 from "web3";
import s from "./StakingPage.module.scss";

export interface StakingDataInterface {
  amount: string;
  claimed: number;
  collected: boolean;
  startTime: string;
  endTime: string;
  months: string;
  owner: string;
  itemIndex: number;
}

interface Props {
  stakingData: StakingDataInterface;
  itemIndex?: number;
  onUpdate?: any;
}

const StakedItem: FC<Props> = ({ stakingData, itemIndex, onUpdate }) => {
  const [currentReward, setCurrentReward] = useState(0);
  const auth = useRecoilValue(authAtom);
  const [isLoading, setIsLoading] = useState(false);

  const stakingContract = AppConfig.contract.krl.staking;
  const tokenStaked = () => {
    return round(+Web3.utils.fromWei(stakingData.amount, "ether"));
  };

  const getAPR = () => {
    return (
      stakingContract.package.find((item) => item.month == +stakingData.months)
        ?.apr || 0
    );
  };

  const getTotalReturns = () => {
    return Misc.calculateAPR(+tokenStaked(), getAPR(), +stakingData.months);
  };

  const remainingDays = () => {
    // const currentDate = moment().startOf('day');
    const currentTime = moment.utc();
    const endTime = moment.unix(+stakingData.endTime);
    const duration = moment.duration(endTime.diff(currentTime));

    const durationList = [
      {
        label: "months",
        value: duration.months(),
      },
      {
        label: "days",
        value: duration.days(),
      },
      {
        label: "hours",
        value: duration.hours(),
      },
      {
        label: "minutes",
        value: duration.minutes(),
      },
    ];

    let label = "";
    let counter = 0;
    durationList.forEach((item) => {
      if (item.value > 0 && counter <= 1) {
        label += `${item.value} ${item.label}, `;
        counter++;
      }
    });
    label = label.replace(/,\s*$/, "");

    return label;
  };

  const getReward = async () => {
    try {
      const response = await StakingService.getCurrentRewards(
        auth?.address!!,
        itemIndex!!
      );
      const totalRewardTillNow = round(
        +Web3.utils.fromWei(response, "ether"),
        2
      );
      const totalClaimedReward = round(
        +Web3.utils.fromWei(stakingData.claimed + "", "ether"),
        2
      );
      if (totalRewardTillNow > 0) {
        setCurrentReward(totalRewardTillNow - totalClaimedReward);
      }
    } catch (error) {
      setCurrentReward(0);
    }
  };

  const isClaimStateActive = () => {
    if (currentReward > 0 || !remainingDays()) {
      return true;
    }
  };

  const processAction = async (isUnstake: boolean) => {
    try {
      setIsLoading(true);
      await StakingService[isUnstake ? "unStakeToken" : "claimRewards"](
        itemIndex!!,
        auth?.address!!
      );
      getReward();
      notification.success({ message: "Successfully processed" });
      if (onUpdate) {
        onUpdate();
      }
    } catch (error: any) {
      if (error.message) {
        notification.error({
          message: error.message,
          key: "claim",
        });
        return;
      }
      notification.error({
        message: "Error occured",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReward();
  }, []);

  return (
    <BlueCard
      textLine1={`${tokenStaked()} ${AppConfig.tokenName} `}
      textLine3={`${remainingDays() ? remainingDays() + " remaining" : ""}`}
      textLine4={`${
        currentReward > 0
          ? `Current Reward: ${round(currentReward, 3)} ${AppConfig.tokenName}`
          : ""
      }`}
      apr={`${getAPR() || "-"}% APR`}
      krlAmount={`${getTotalReturns()} ${AppConfig.tokenName}`}
      itemIndex={itemIndex}
    >
      <div className={`${s.action}`}>
        <div className={`btnWrapper text-center`}>
          <Button
            type="primary"
            loading={isLoading}
            disabled={!isClaimStateActive()}
            onClick={() => {
              processAction(remainingDays() == "");
            }}
          >
            {remainingDays() ? "CLAIM" : "UNSTAKE"}
          </Button>
        </div>
      </div>
    </BlueCard>
  );
};

export default StakedItem;
