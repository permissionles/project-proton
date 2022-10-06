import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.scss";
import { RainbowKitAuthProvider } from "../components/ui/RainbowKitAuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitAuthProvider>
      <Component {...pageProps} />
    </RainbowKitAuthProvider>
  );
}

export default MyApp;
