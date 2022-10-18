import Image from "next/image";
import { FC, useEffect, useState } from "react";
import s from "./StockWidget.module.scss";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  notification,
  Progress,
  Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useAccount, useContractWrite, useProvider } from "wagmi";
import WalletConnect from "@components/common/WalletConnect";
import { ethers, Signer } from "ethers";
import { MiscService } from "services";
import ProtonConfig from "@config/ProtonConfig";
import math, { round } from "mathjs";
import UserStakes from "@components/StakingPage/UserStakes";

const StockWidget: FC = () => {
  const stakingContract = ProtonConfig.contract.proton.staking;

  //FORM
  const [form] = Form.useForm();
  // Select Duration
  const [duration, setDuration] = useState("Duration");
  //Current PRTN Value
  const [prtn, setPRTN] = useState(0.0135);
  //Total Stocked PRTN
  const [totalStocked, setTotalStocked] = useState(0);
  //Daily Rewards
  const [dailyRewards, setDailyRewards] = useState(0);
  //Total Rewards
  const [totalRewards, setTotalRewards] = useState(0);
  //Dollar Value
  const [dollarValue, setDollarValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //Conenct Wallet
  //   const { address, isConnected } = useAccount();
  const [signer, setSigner] = useState<Signer | null>(null);
  const provider = useProvider();
  const { address, isConnected, connector } = useAccount();
  const [isInitialzed, setIsInitialzed] = useState(false);

  //LOADERS
  const [isApproving, setIsApproving] = useState(false);
  //   const [isApproving, setIsApproving] = useState(false);

  const [approvedToken, setApprovedToken] = useState(0);

  const { writeAsync: stakeTokenWrite } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: ProtonConfig.contract.proton.staking.address,
    contractInterface: ProtonConfig.contract.proton.staking.abi,
    functionName: "stake",
  });

  //APPROVE TOKENS
  const appoveTokenFunc = async (formAmount: string) => {
    console.log("Form Amount: ", formAmount);

    if (formAmount == null) {
      notification.error({ message: "Please enter amount" });
    } else {
      try {
        setIsApproving(true);
        const tokenAmountInWei = ethers.utils.parseEther(formAmount + "");
        await approveToken(tokenAmountInWei);
      } catch (error) {
        console.log("Error in Aprroval: ", error);
        setIsApproving(false);
      } finally {
        setIsApproving(false);
      }
    }
  };

  const getApprovedToken = async () => {
    try {
      const approvedTokens = await MiscService.allowance(
        ProtonConfig.contract.proton.token.address,
        address!!,
        ProtonConfig.contract.proton.staking.address
      );
      console.log("APPROVED TOKENS: ", approvedTokens);

      const approvedTokensInt = ethers.utils.formatEther(
        approvedTokens.toString()
      );

      console.log("Approved TOkens: ", approvedTokensInt);
      setApprovedToken(+approvedTokensInt);
    } catch (error) {
      console.log("ERROR APPROVED TOKENS: ", error);
    }
  };

  const approveToken = async (tokenAmount: any) => {
    if (tokenAmount == null) {
      notification.error({ message: "Please enter amount" });
      return;
    }
    try {
      setIsApproving(true);
      let contract = new ethers.Contract(
        ProtonConfig.contract.proton.token.address,
        ProtonConfig.contract.genericABI,
        signer!!
      );
      const tokenAmountInWei = ethers.utils.parseEther(tokenAmount + "");
      const response = await contract.approve(
        ProtonConfig.contract.proton.staking.address,
        tokenAmountInWei
      );
      await provider.waitForTransaction(response.hash);
      // await MiscService.approveToken(
      //   ProtonConfig.contract.proton.token.address,
      //   ProtonConfig.contract.proton.staking.address,
      //   tokenAmount,
      //   address!!
      // );

      notification.success({ message: "Tokens Approved" });
    } catch (error) {
      console.log("error", error);
      // setIsApproving(false);
    } finally {
      setIsApproving(false);
    }
  };

  const getAPR = (month: string) => {
    return (
      stakingContract.package.find((item: any) => item.month == month)?.apr || 0
    );
  };

  const expectedReturn = () => {
    console.log("AMOUNT RETURN");
    // setDailyRewards(0);
    // setTotalRewards(0);

    const amount = form.getFieldValue("amount");

    console.log("AMOUNT: ", amount, duration);

    if (!duration || !amount) {
      return 0;
    }
    const _duration = duration.split("")[0];

    const amountWithProfit =
      +amount +
      round((+amount * +getAPR(_duration) * +_duration) / 12 / 100, 2);
    return amountWithProfit;

    // if (duration != "Duration") {
    //   if (duration == "1 month") {
    //     let totalReturns = (+amount / 100) * 12;
    //     console.log("Total Returns: ", totalReturns);
    //     let dailyRewards = totalReturns / 365;
    //     console.log("Daily Returns: ", dailyRewards);
    //     setDailyRewards(dailyRewards);
    //     setTotalRewards(totalReturns + +amount);
    //   } else if (duration == "4 months") {
    //     let totalReturns = (+amount / 100) * 18;
    //     console.log("Total Returns: ", totalReturns);
    //     let dailyRewards = totalReturns / 365;
    //     console.log("Daily Returns: ", dailyRewards);
    //     setDailyRewards(dailyRewards);
    //     setTotalRewards(totalReturns + +amount);
    //   } else if (duration == "12 months") {
    //     let totalReturns = (+amount / 100) * 30;
    //     console.log("Total Returns: ", totalReturns);
    //     let dailyRewards = totalReturns / 365;
    //     console.log("Daily Returns: ", dailyRewards);
    //     setDailyRewards(dailyRewards);
    //     setTotalRewards(totalReturns + +amount);
    //   }
    // }
  };

  const onFinish = async () => {
    if (+form.getFieldValue("amount") < 0 || duration == "Duration") {
      notification.error({
        message: "Enter amount and duration required",
        key: "stake-form-error",
      });
      return;
    }
    if (!isConnected) {
      notification.error({
        message: "Connect your wallet",
        key: "stake-form-error",
      });
      return;
    }

    let month;
    if (duration == "1 month") {
      month = 1;
    } else if (duration == "4 months") {
      month = 4;
    } else {
      month = 12;
    }
    const tokenAmountInWei = ethers.utils.parseEther(
      form.getFieldValue("amount")
    );

    try {
      setIsLoading(true);
      // await approveToken(tokenAmountInWei);
      console.log(
        "Pool Id: ",
        0,
        "Months: ",
        month,
        "Token Amount in Wei: ",
        tokenAmountInWei,
        "From: ",
        address
      );

      // await StakingService.stakeToken(0, tokenAmountInWei, month, address);
      const stakeTokenWriteResponse = await stakeTokenWrite({
        recklesslySetUnpreparedArgs: [0, tokenAmountInWei, month],
      });
      await stakeTokenWriteResponse.wait();
      notification.success({ message: "Token Successfully Stocked" });
    } catch (error: any) {
      if (error.message) {
        notification.error({
          message: error.message,
          key: "staketoken",
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
    setIsInitialzed(true);
  }, []);

  const menu = (
    <Menu
      className="stock-duration-dropdown"
      items={[
        {
          key: "1",
          label: (
            // <a
            //   target="_blank"
            //   rel="noopener noreferrer"
            //   href="https://www.antgroup.com"
            // >
            //   1st menu item
            // </a>
            <div
              className={s.menuItems}
              onClick={() => {
                setDuration("1 month");
                expectedReturn();
              }}
            >
              <div>1 Month</div>
              <div>12% APR</div>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              className={s.menuItems}
              onClick={() => {
                setDuration("4 months");
                expectedReturn();
              }}
            >
              <div>4 Months</div>
              <div>18% APR</div>
            </div>
          ),
          //   icon: <SmileOutlined />,
          //   disabled: true,
        },
        {
          key: "3",
          label: (
            <div
              className={s.menuItems}
              onClick={() => {
                setDuration("12 months");
                expectedReturn();
              }}
            >
              <div>12 Months</div>
              <div>30% APR</div>
            </div>
          ),
        },
      ]}
    />
  );

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

  return (
    <div className={s.container}>
      <div className={s.stockTokens}>
        <div className={s.headings}>
          <div className={s.title}>Stocks</div>
          <div className={s.protonPrice}>
            $PRTN <span>{prtn}</span>
          </div>
        </div>
        <div className={s.progressBar}>
          <div className={s.progress}>
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={50.9}
            />
          </div>
          <div className={s.infoText}>200k / 1Mil</div>
        </div>
        <Form form={form}>
          <div className={s.amountRow}>
            <div className={s.tokenInfo}>
              <Image
                src={"/images/logo.svg"}
                height={22}
                width={25}
                alt="Logo"
              />
              <div>PRTN</div>
            </div>
            <div className={s.amountInput}>
              <Form.Item name="amount">
                <Input
                  placeholder="00"
                  onChange={(value) => {
                    // console.log("Amount: ");
                    expectedReturn();
                  }}
                  bordered={false}
                  className={s.inputPad}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
        <div className={s.dollarAmount}>$ {dollarValue}</div>
        <div className={s.durationDropDown}>
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <div className={s.durationBtn}>
                {duration}
                <DownOutlined />
              </div>
            </a>
          </Dropdown>
        </div>
        <div className={s.rewardsInfo}>
          <div className={s.title}>Rewards</div>
          <div className={s.dailyRewards}>
            <div className={s.heading}>Daily</div>
            <div className={s.info}>
              {round(expectedReturn() / 365, 2)} PRTN
            </div>
          </div>
          <div className={s.totalRewards}>
            <div className={s.heading}>Total</div>
            <div className={s.info}>{round(expectedReturn(), 2)} PRTN</div>
          </div>
        </div>
        {isConnected ? (
          <div className={s.ctas}>
            <div className={s.approveBtn}>
              <Button
                type="primary"
                loading={isApproving}
                onClick={() => {
                  approveToken(form.getFieldValue("amount"));
                  //   console.log("Ammount: ", form.getFieldValue("amount"));
                }}
                className="ctaBtn"
              >
                APPROVE
              </Button>
            </div>
            <div className={s.stockBtn}>
              <Button
                type="primary"
                loading={isLoading}
                onClick={() => {
                  onFinish();
                }}
                className="ctaBtn"
              >
                STOCK
              </Button>
            </div>
          </div>
        ) : (
          <div className={s.walletConnect}>
            <WalletConnect />
          </div>
        )}
      </div>
      {isConnected && <UserStakes />}
    </div>
  );
};

export default StockWidget;
