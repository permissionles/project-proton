import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC } from "react";
import s from "./WalletConnect.module.scss";

const WalletConnect: FC = () => {
  return (
    <div className={`${s.container} wallet-connect`}>
      <div className={`${s.connectBtn}`}>
        <ConnectButton />
      </div>
    </div>
  );
};

export default WalletConnect;
