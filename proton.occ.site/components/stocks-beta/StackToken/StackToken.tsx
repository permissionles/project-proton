import { Button, Form, Input, Modal, notification } from "antd";
import { ethers, Signer } from "ethers";
import { FC, useEffect, useState } from "react";
import { useAccount, useContractWrite, useProvider } from "wagmi";
import { AppConfig } from "../../../config/AppConfig";
import s from "./StackToken.module.scss";

const StackToken: FC = () => {
  const provider = useProvider();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signer, setSigner] = useState<Signer | null>(null);
  const { isConnected, connector } = useAccount();

  const { writeAsync: stakeTokenWrite } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: AppConfig.contract.stocks.address,
    contractInterface: AppConfig.contract.stocks.abi,
    functionName: "stake",
  });

  const onFinish = async (formValues: any) => {
    if (!isConnected) {
      notification.error({ message: "Please connect your wallet" });
      return;
    }
    setIsLoading(true);
    try {
      let contract = new ethers.Contract(
        AppConfig.contract.stocks.tokenToStake,
        AppConfig.genericABI,
        signer!!
      );
      console.log(
        "AppConfig.contract.stocks.tokenToStake",
        AppConfig.contract.stocks.tokenToStake
      );

      const amount = (formValues.amount * Math.pow(10, 18)).toString();
      console.log("amount", amount);

      notification.warning({ message: "Approve token" });

      const response = await contract.approve(
        AppConfig.contract.stocks.address,
        amount
      );
      await provider.waitForTransaction(response.hash);

      const depositWriteResponse = await stakeTokenWrite({
        recklesslySetUnpreparedArgs: [amount],
      });

      await depositWriteResponse?.wait();
      notification.success({ message: "Stock added successfully" });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className={s.container}>
      <div className="btn-prt" onClick={() => setIsActive(true)}>
        Stock $PRTN
      </div>
      <div className={`btn-prt btn-prt--bordered ${s.withdraw}`}>Withdraw</div>
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
          <span className="title">Stock $PRTN</span>
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
              Stock
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StackToken;
