import { FC } from "react";
import { useContractRead } from "wagmi";
import { AppConfig } from "../../../config/AppConfig";
import s from "./StocksBeta.module.scss";

const PoolProgress: FC = () => {
  const { data: totalStakedData } = useContractRead({
    addressOrName: AppConfig.contract.stocks.address,
    contractInterface: AppConfig.contract.stocks.abi,
    functionName: "totalStaked",
    onError(error) {
      console.log("Error", error);
    },
  });

  console.log(totalStakedData, "totalStakedData");

  return (
    <div className={s.poolContainer}>
      <div className={s.total}>100,00,00,00</div>
      <div className={s.progress}>
        <span className={s.percent} style={{ width: "30%" }} />
      </div>
    </div>
  );
};

export default PoolProgress;
