import ProtonConfig from "@config/ProtonConfig";
import { Button, Form, Input, notification, Radio } from "antd";
import { round } from "mathjs";
import { FC, useEffect, useState } from "react";
// import { MiscService, StakingService } from "services";
// import Web3 from "web3";
import s from "../StakingPage.module.scss";
import { useAccount, useContractWrite, useProvider } from "wagmi";
import { ethers, Signer } from "ethers";

const StakeTokens: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [isInitialzed, setIsInitialzed] = useState(false);
  const [userAmount, setUserAmount] = useState<number | string>("");
  const [rewardValue, setRewardValue] = useState(0);
  const { address, isConnected, connector } = useAccount();
  const [signer, setSigner] = useState<Signer | null>(null);
  const provider = useProvider();

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
      await approveToken(tokenAmountInWei);
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
      notification.success({ message: "Token Successfully Staked" });
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
      setIsLoading(true);
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
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
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

  useEffect(() => {
    expectedReturn();
  }, [userAmount]);

  useEffect(() => {
    setIsInitialzed(true);
  }, []);

  return (
    <div className={`${s.stakeCard}`}>
      <div className={`${s.textCenter} f22 f-lg fm-26 blue fw400`}>
        STOCK YOUR ${ProtonConfig.tokenName}
      </div>

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

        <p className={`${s.feildTitle} f22 blue fm-26`}>DURATION</p>
        <Form.Item name="duration">
          <Radio.Group>
            {ProtonConfig.contract.proton.staking.package.map((item, i) => (
              <Radio.Button value={`${item.month}-${item.apr}`} key={i}>
                {item.month} Months <br /> ({item.apr}% APR)
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <div className={`${s.rewards}  text-center `}>
          <div className={s.heading}>Expected stocking reward</div>
          <div className="value">
            {rewardValue} {ProtonConfig.tokenName}
          </div>
        </div>

        <Form.Item className="text-center">
          <div className="btnWrapper m0-auto">
            <Button htmlType="submit" loading={isLoading}>
              STAKE
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StakeTokens;
