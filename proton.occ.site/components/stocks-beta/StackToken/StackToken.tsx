import { Button, Form, Input, Modal, notification, Tooltip } from "antd";
import { ethers, Signer } from "ethers";
import { FC, useEffect, useState } from "react";
import { useAccount, useContractWrite, useProvider } from "wagmi";
import { AppConfig } from "../../../config/AppConfig";
import s from "./StackToken.module.scss";

const StackToken: FC = () => {
  const provider = useProvider();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [signer, setSigner] = useState<Signer | null>(null);
  const { isConnected, connector, address } = useAccount();
  const [amountStaked, setAmountStaked] = useState(0);

  const { writeAsync: stakeTokenWrite } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: AppConfig.contract.stocks.address,
    contractInterface: AppConfig.contract.stocks.abi,
    functionName: "stake",
  });

  const { writeAsync: unStakeTokenWrite } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: AppConfig.contract.stocks.address,
    contractInterface: AppConfig.contract.stocks.abi,
    functionName: "unStake",
  });

  const getUserStacked = async () => {
    var customHttpProvider = new ethers.providers.JsonRpcProvider(
      AppConfig.rpcNetwork
    );
    let contract = new ethers.Contract(
      AppConfig.contract.stocks.address,
      AppConfig.contract.stocks.abi,
      customHttpProvider
    );

    const response = await contract.stakes(address);
    setAmountStaked(+ethers.utils.formatEther(response.amount.toString()));
  };

  useEffect(() => {
    if (isConnected) {
      getUserStacked();
    }
  }, [isConnected]);

  const onFinish = async (formValues: any) => {
    if (!isConnected) {
      notification.error({ message: "Please connect your wallet" });
      return;
    }
    setIsLoading("stake");
    try {
      let contract = new ethers.Contract(
        AppConfig.contract.stocks.tokenToStake,
        AppConfig.genericABI,
        signer!!
      );

      const amount = (formValues.amount * Math.pow(10, 18)).toString();

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
      getUserStacked();
    } catch (error) {
      console.log(error);
      notification.error({ message: "Something went wrong" });
    } finally {
      setIsLoading("");
    }
  };

  const unStakeToken = async () => {
    if (!isConnected) {
      notification.error({ message: "Please connect your wallet" });
      return;
    }
    if (amountStaked <= 0) {
      notification.error({ message: "No stack found" });
      return;
    }
    const amountToUnStake = ethers.utils
      .parseEther(amountStaked.toString())
      .toString();
    try {
      setIsLoading("unStake");
      const response = await unStakeTokenWrite({
        recklesslySetUnpreparedArgs: [amountToUnStake],
      });
      await response.wait();
      notification.success({ message: "Successfully unstaked" });
      getUserStacked();
    } catch (error) {
    } finally {
      setIsLoading("");
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
      <Tooltip title={amountStaked ? `$PRTN: ${amountStaked}` : ""}>
        <Button
          type="primary"
          htmlType="button"
          className={`btn-prt btn-prt--bordered ${s.withdraw}`}
          onClick={() => {
            unStakeToken();
          }}
          loading={isLoading === "unStake"}
        >
          Withdraw
        </Button>
      </Tooltip>
      <Modal
        open={isActive}
        onCancel={() => {
          setIsActive(false);
          setIsLoading("");
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
              loading={isLoading === "stake"}
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
