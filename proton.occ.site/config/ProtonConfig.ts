import { genericABI, PRTNStaking, PRTNToken } from "./contracts";

const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";

const ProtonConfig = {
  isDevelopment: isDevelopment,
  API_URL: "",
  tokenName: "PRTN",
  CMS_API_URL: "",
  contract: {
    proton: {
      token: PRTNToken,
      staking: PRTNStaking,
    },
    genericABI,
  },
  RPC: isDevelopment
    ? "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    : "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",

  chainId: isDevelopment ? 5 : 5,
  networkList: {
    1: {
      name: "Ethereum",
    },
    5: {
      name: "Goeril Testnet",
    },
  },
  mongoUri: "",
};

export default ProtonConfig;
