import { FC, useEffect, useState } from "react";
import { Button, Form, FormListFieldData, Modal, notification } from "antd";

import s from "./AddReward.module.scss";
import Input from "antd/lib/input/Input";
import { ethers, Signer } from "ethers";
import { AppConfig } from "../../../config/AppConfig";
import { useAccount, useContractWrite, useProvider, useSigner } from "wagmi";

const AddReward: FC = () => {
  const { isConnected, connector } = useAccount();
  const provider = useProvider();

  const [isActive, setIsActive] = useState(false);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: _userSigner } = useSigner({
    onSuccess(data) {
      console.log(data, "signer");
      // setSigner(data);
    },
  });

  const { writeAsync: submitDepositRewardsWrite } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: AppConfig.contract.stocks.address,
    contractInterface: AppConfig.contract.stocks.abi,
    functionName: "depositRewards",
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

  const onFinish = async (formValues: any) => {
    if (!isConnected) {
      notification.error({ message: "Please connect your wallet" });
      return;
    }
    setIsLoading(true);
    console.log("signer", signer);
    try {
      let contract = new ethers.Contract(
        formValues.tokenAddress,
        AppConfig.genericABI,
        signer!!
      );
      const tokenSymbol = await contract.symbol();
      const tokenDecimals = await contract.decimals();

      const amount = (
        formValues.amount * Math.pow(10, tokenDecimals)
      ).toString();

      notification.warning({ message: "Approve token" });

      const response = await contract.approve(
        AppConfig.contract.stocks.address,
        amount
      );
      await provider.waitForTransaction(response.hash);

      const depositWriteResponse = await submitDepositRewardsWrite({
        recklesslySetUnpreparedArgs: [formValues.tokenAddress, amount],
      });

      await depositWriteResponse?.wait();
      notification.success({ message: "Reward added successfully" });

      console.log("symbol", tokenSymbol, tokenDecimals);
    } catch (error) {
      console.log(error);
      notification.error({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <span className={`${s.add}`} onClick={() => setIsActive(true)}>
        + Add Rewards
      </span>
      <Modal
        open={isActive}
        onCancel={() => {
          setIsActive(false);
          setIsLoading(false);
        }}
        footer={null}
        className="theme-modal-ui"
      >
        <Form onFinish={onFinish} className={`theme-form`}>
          <span className="title">Add reward</span>
          <Form.Item
            name="tokenAddress"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter token address" />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" placeholder="Enter amount" />
          </Form.Item>
          <div className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="btn-prt btn-large"
              loading={isLoading}
            >
              Add Reward
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddReward;
