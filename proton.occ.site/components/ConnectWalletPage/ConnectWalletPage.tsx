import WalletConnect from "@components/common/WalletConnect";
import Image from "next/image";
import { FC } from "react";
import s from "./ConnectWalletPage.module.scss";

// interface Props {
//   textLine1?: string;
//   textLine2?: string;
//   textLine3?: string;
//   apr?: string;
//   krlAmount?: string;
//   type?: "big" | "small";
//   claimButton?: boolean;
// }

const BlueCard: FC = () => {
  return (
    <>
      <div className={`${s.compWrapper}`}>
        <div className="vestingHeader">
          <div className="logoWrapper">
            <Image src="/images/logo.svg" alt="logo" layout="fill" />
          </div>
        </div>
        <div className={`${s.connectWalletCard}`}>
          <WalletConnect />
          <p className="titleShadow f26">
            Please connect your wallet to proceed
          </p>
        </div>
      </div>
    </>
  );
};

export default BlueCard;
