/* eslint-disable @next/next/no-img-element */
import { Tooltip } from "antd";
import { ethers } from "ethers";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { AppConfig } from "../../../config/AppConfig";
import s from "./RewardList.module.scss";

interface Props {
  data: any;
}

const RewardItem: FC<Props> = ({ data }) => {
  const [tokenInfo, setTokenInfo] = useState({ symbol: "", decimals: 0 });
  const { isConnected, address } = useAccount();
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);

  const getInfo = async () => {
    var customHttpProvider = new ethers.providers.JsonRpcProvider(
      AppConfig.rpcNetwork
    );
    let tokenContract = new ethers.Contract(
      data.id,
      AppConfig.genericABI,
      customHttpProvider
    );

    let stockContract = new ethers.Contract(
      AppConfig.contract.stocks.address,
      AppConfig.contract.stocks.abi,
      customHttpProvider
    );

    const [symbol, decimals] = await Promise.all([
      tokenContract.symbol(),
      tokenContract.decimals(),
      // stockContract.reward(address, data.id),
    ]);
    setTokenInfo({ symbol, decimals });
    // console.log(_withdrawableAmount.toString(), symbol);
    // setWithdrawableAmount(_withdrawableAmount);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className={s.list}>
      <div className={`${s.title} ${s.col}`}>
        {/* {withdrawableAmount} */}
        <img
          src={`/images/icon/${tokenInfo.symbol}.png`}
          width={40}
          height={40}
          alt=""
        />
        <span className={s.name}>{tokenInfo.symbol}</span>
      </div>

      <span className={`${s.address} ${s.col} ${s.onlyDesktop}`}>
        {data.id.slice(0, 6)}...${data?.id.slice(-4)}
      </span>
      <span className={`${s.address} ${s.col} ${s.onlyMobile}`}>{data.id}</span>
      {tokenInfo.decimals && (
        <span className={`${s.amount} ${s.col} ${s.onlyDesktop}`}>
          <Tooltip title="Token Distributed">
            <span>
              {+data.tokensDistributed / Math.pow(10, tokenInfo.decimals)}
            </span>{" "}
            /
          </Tooltip>
          <Tooltip title="Token Deposited">
            <span>
              {+data.tokensDeposited / Math.pow(10, tokenInfo.decimals)}
            </span>
          </Tooltip>
        </span>
      )}
      {tokenInfo.decimals && (
        <span className={`${s.amount} ${s.col} ${s.onlyMobile}`}>
          Token Distributed:{" "}
          <span>
            {+data.tokensDistributed / Math.pow(10, tokenInfo.decimals)}
          </span>
          <br />
          Token Deposited:{" "}
          <span>
            {+data.tokensDeposited / Math.pow(10, tokenInfo.decimals)}
          </span>
        </span>
      )}

      <div className={`btn-prt btn-prt--disabled ${s.action}`}>Claim</div>
    </div>
  );
};

export default RewardItem;
