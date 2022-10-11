import BlueCard from "@components/common/BlueCard";
import ProtonConfig from "@config/ProtonConfig";
import { Button, notification } from "antd";
import { ethers, Signer } from "ethers";
import { round } from "mathjs";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { StakingService } from "services";
import Misc from "utility/Misc";
import { useAccount, useProvider } from "wagmi";
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
  // const auth = useRecoilValue(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  // const { address, isConnected } = useAccount();
  const { address, isConnected, connector } = useAccount();

  const [signer, setSigner] = useState<Signer | null>(null);
  const provider = useProvider();

  const stakingContract = ProtonConfig.contract.proton.staking;
  console.log("stakingData.amount.toString()", stakingData.amount.toString());

  // get signer
  useEffect(() => {
    (async () => {
      try {
        const res = await connector?.getSigner();
        setSigner(res);
      } catch (e) {
        setSigner(null);
      }
    })();
  }, [connector]);
  const tokenStaked = () => {
    return round(
      +ethers.utils.formatUnits(stakingData.amount.toString(), "ether")
    );
  };

  const getAPR = () => {
    return (
      stakingContract.package.find(
        (item: any) => item.month == +stakingData.months.toString()
      )?.apr || 0
    );
  };

  const getTotalReturns = () => {
    return Misc.calculateAPR(
      +tokenStaked(),
      getAPR(),
      +stakingData.months.toString()
    );
  };

  const remainingDays = () => {
    // const currentDate = moment().startOf('day');
    const currentTime = moment.utc();
    const endTime = moment.unix(+stakingData.endTime.toString());
    const duration = moment.duration(endTime.diff(currentTime));
    console.log(stakingData.endTime.toString(), "time");

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
        address!!,
        itemIndex!!
      );
      const totalRewardTillNow = round(
        +ethers.utils.formatUnits(response.toString(), "ether"),
        2
      );
      const totalClaimedReward = round(
        +ethers.utils.formatUnits(stakingData.claimed.toString() + "", "ether"),
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
      // await StakingService[isUnstake ? "unStakeToken" : "claimRewards"](
      //   itemIndex!!,
      //   address!!
      // );
      let contract = new ethers.Contract(
        ProtonConfig.contract.proton.staking.address,
        ProtonConfig.contract.proton.staking.abi,
        signer!!
      );

      let response = null;

      if (isUnstake) {
        response = await contract.unStake(itemIndex!!);
      } else {
        response = await contract.claimRewards(itemIndex!!);
      }

      await provider.waitForTransaction(response.hash);

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
      textLine1={`${tokenStaked()} ${ProtonConfig.tokenName} `}
      textLine3={`${remainingDays() ? remainingDays() + " remaining" : ""}`}
      textLine4={`${
        currentReward > 0
          ? `Current Reward: ${round(currentReward, 3)} ${
              ProtonConfig.tokenName
            }`
          : ""
      }`}
      apr={`${getAPR() || "-"}% APR`}
      krlAmount={`${getTotalReturns()} ${ProtonConfig.tokenName}`}
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
