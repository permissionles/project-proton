import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import s from "./WalletConnect.module.scss";

const WalletConnect: FC = () => {
  return (
    <div className={`${s.container} `}>
      <div className={`${s.connectBtn}`}>
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
};

export default WalletConnect;
