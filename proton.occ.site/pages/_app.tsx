import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitAuthProvider } from "../components/ui/RainbowKitAuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitAuthProvider>
      <Component {...pageProps} />
    </RainbowKitAuthProvider>
  );
}

export default MyApp;
