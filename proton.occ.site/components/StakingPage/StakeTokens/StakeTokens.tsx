import ProtonConfig from "@config/ProtonConfig";
import { Button, Form, Input, message, notification, Radio } from "antd";
import { add, round } from "mathjs";
import { FC, useEffect, useState } from "react";
// import { MiscService, StakingService } from "services";
// import Web3 from "web3";
import s from "../StakingPage.module.scss";

import { useAccount, useContractWrite, useProvider } from "wagmi";
import { ethers, Signer } from "ethers";
import WalletConnect from "@components/common/WalletConnect";
import { MiscService } from "services";
import { AppConfig } from "@config/AppConfig";
import AppConstant from "constant/AppConstant";

const StakeTokens: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [isInitialzed, setIsInitialzed] = useState(false);
  const [userAmount, setUserAmount] = useState<number | string>("");
  const [rewardValue, setRewardValue] = useState(0);
  const { address, isConnected, connector } = useAccount();
  const [signer, setSigner] = useState<Signer | null>(null);
  const provider = useProvider();
  const [approvedToken, setApprovedToken] = useState(0);
  const [isApproving, setIsApproving] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  const { writeAsync: stakeTokenWrite } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: ProtonConfig.contract.proton.staking.address,
    contractInterface: ProtonConfig.contract.proton.staking.abi,
    functionName: "stake",
  });

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

  const expectedReturn = () => {
    setRewardValue(0);
    if (!isInitialzed) {
      return 0;
    }
    let formValues = form.getFieldsValue();
    formValues = { ...formValues, amount: userAmount };

    if (hasFormError()) {
      return 0;
    }

    const [month, apr] = formValues.duration.split("-");

    const amountWithProfit =
      formValues.amount +
      round((+formValues.amount * +apr * +month) / 12 / 100, 2);

    setRewardValue(amountWithProfit);
  };

  const onFinish = async (formValues: any) => {
    if (hasFormError()) {
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
    const [month] = formValues.duration.split("-");
    const tokenAmountInWei = ethers.utils.parseEther(
      formValues.amount.toString()
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

  const approveToken = async (tokenAmount: any) => {
    try {
      setIsApproving(true);
      let contract = new ethers.Contract(
        ProtonConfig.contract.proton.token.address,
        ProtonConfig.contract.genericABI,
        signer!!
      );
      const response = await contract.approve(
        ProtonConfig.contract.proton.staking.address,
        tokenAmount
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
      setIsApproving(false);
    } finally {
    }
  };

  const hasFormError = () => {
    let formValues = form.getFieldsValue();

    formValues = { ...formValues, amount: userAmount };
    let hasError = false;

    for (let index = 0; index < Object.keys(formValues).length; index++) {
      if (!Object.values(formValues)[index]) {
        hasError = true;
        break;
      }
    }

    return hasError;
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

  useEffect(() => {
    expectedReturn();
  }, [userAmount]);

  useEffect(() => {
    setIsInitialzed(true);
  }, []);

  useEffect(() => {
    if (!isConnected) return;
    getApprovedToken();
  }, [isConnected]);

  const appoveTokenFunc = async (formAmount: string) => {
    console.log("Form Amount: ", formAmount);

    if (formAmount == null) {
      notification.error({ message: "Please enter amount" });
    } else {
      try {
        setIsApproving(true);
        const tokenAmountInWei = ethers.utils.parseEther(formAmount + "");
        await approveToken(tokenAmountInWei);
        getApprovedToken();
      } catch (error) {
        console.log("Error in Aprroval: ", error);
        setIsApproving(false);
      } finally {
        setIsApproving(false);
      }
    }
  };

  const getUserBalance = async () => {
    console.log("Address USER BALANCE: ", address);

    const customRPC = new ethers.providers.JsonRpcProvider(ProtonConfig.RPC);

    try {
      let contract = new ethers.Contract(
        ProtonConfig.contract.proton.token.address,
        ProtonConfig.contract.genericABI,
        customRPC
      );

      const response = await contract.balanceOf(address);
      // await provider.waitForTransaction(response.hash);

      console.log("BALANCE: ", response.toString());
      const amountInt = ethers.utils.formatEther(response.toString());
      console.log("Amount Yo: ", amountInt.toString());
      setUserBalance(+amountInt.toString());
    } catch (error) {
      console.log("Error GET BALANCE: ", error, address);
    }
  };

  useEffect(() => {
    if (!address) return;
    getUserBalance();
  }, [address]);

  return (
    <div className={`${s.stakeCard}`}>
      <div className={s.cardWrapper}>
        <Form
          form={form}
          layout="vertical"
          className="stakeForm"
          scrollToFirstError={true}
          onFieldsChange={() => {
            expectedReturn();
          }}
          onFinish={onFinish}
        >
          <div className={s.stake}>
            <div className={`${s.textCenter}`}>STOCK</div>
            <div className={s.textField}>
              <div className={s.prefixText}>
                <p>$PRTN</p>
              </div>
              <Form.Item required name="amount" className="theme-input-number">
                <Input
                  value={userAmount}
                  placeholder="Amount"
                  onChange={(value) => {
                    const fieldValue = +value.target.value;
                    if (isNaN(fieldValue)) return;
                    setUserAmount(fieldValue);
                    form.setFieldsValue({
                      ...form.getFieldsValue(),
                      amount: fieldValue,
                    });
                  }}
                />

                {/* <div className={s.maxBtn}>MAX</div> */}
              </Form.Item>
            </div>
            <div className={s.maxInfo}>
              <p>
                Your Balance: <span>{userBalance} $PRTN</span>{" "}
              </p>
            </div>
          </div>
          <div className={s.duration}>
            <p className={`${s.feildTitle}`}>DURATION</p>
            <Form.Item name="duration">
              <Radio.Group>
                {ProtonConfig.contract.proton.staking.package.map((item, i) => (
                  <Radio.Button value={`${item.month}-${item.apr}`} key={i}>
                    {item.month} Months <br />{" "}
                    <div className="value">({item.apr}% APR)</div>
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>

            <div className={`${s.rewards}  text-center `}>
              <div className={s.heading}>Expected stocking reward</div>
              <div className="value">
                {rewardValue} ${ProtonConfig.tokenName}
              </div>
            </div>
            <div className={s.ctas}>
              <Form.Item className="text-center">
                <div className="btnWrapper">
                  {isConnected ? (
                    <div className={s.approve}>
                      <Button
                        onClick={() => {
                          appoveTokenFunc(form.getFieldValue("amount"));
                        }}
                        loading={isApproving}
                      >
                        Approve
                      </Button>
                      <div className={s.info}>
                        <p>
                          Already Approved Token:{" "}
                          <span>{approvedToken} $PRTN</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </Form.Item>
              <Form.Item className="text-center">
                <div className="btnWrapper">
                  {isConnected ? (
                    <Button htmlType="submit" loading={isLoading}>
                      STOCK
                    </Button>
                  ) : (
                    <WalletConnect />
                  )}
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StakeTokens;
