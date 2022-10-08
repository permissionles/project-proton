import { ethers } from "ethers";
import { FC, useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { AppConfig } from "../../../config/AppConfig";
import s from "./StocksBeta.module.scss";

const PoolProgress: FC = () => {
  const totalLimit = 100000000;
  const [amountStaked, setAmountStaked] = useState(0);
  const getTotalStacked = async () => {
    var customHttpProvider = new ethers.providers.JsonRpcProvider(
      AppConfig.rpcNetwork
    );
    let contract = new ethers.Contract(
      AppConfig.contract.stocks.address,
      AppConfig.contract.stocks.abi,
      customHttpProvider
    );

    const response = await contract.totalStaked();
    setAmountStaked(+ethers.utils.formatEther(response.toString()));
  };

  useEffect(() => {
    getTotalStacked();
  }, []);

  const getPercent = () => {
    return (amountStaked / totalLimit) * 100;
  };

  return (
    <div className={s.poolContainer}>
      <div className={s.total}>100,00,00,00</div>
      <div className={s.progress}>
        <span className={s.percent} style={{ width: `${getPercent()}%` }} />
      </div>
    </div>
  );
};

export default PoolProgress;
