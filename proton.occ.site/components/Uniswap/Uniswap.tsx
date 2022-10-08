import { FC } from "react";
import Iframe from "react-iframe";
import s from "./Uniswap.module.scss";
import { darkTheme, SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";

const Uniswap: FC = () => {
  // You can also pass a token list as JSON, as long as it matches the schema
  // Default token list from Uniswap
  const UNISWAP_TOKEN_LIST = "https://gateway.ipfs.io/ipns/tokens.uniswap.org";

  // Use the native token of the connected chain as the default input token
  const NATIVE = "NATIVE"; //

  // WBTC as the default output token
  const PRTN = "0xD17549214EE159A81F4EABa94c3B01118191c675";

  return (
    <div className={s.container}>
      <div className={s.iframe}>
        <Iframe
          url="https://network.occ.site/#/room/#project-proton:matrix.org"
          // height="800px"
          // width="600px"

          position="relative"
        />
      </div>
      <div>
        <div className="Uniswap">
          <SwapWidget
            tokenList={UNISWAP_TOKEN_LIST}
            defaultInputTokenAddress={NATIVE}
            defaultInputAmount={2}
            defaultOutputTokenAddress={PRTN}
            theme={darkTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default Uniswap;
