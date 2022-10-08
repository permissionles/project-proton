import { genericABI, PRTNStaking, PRTNToken } from "./contracts";

const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";

const ProtonConfig = {
  isDevelopment: isDevelopment,
  API_URL: "",
  tokenName: "PRTN",
  CMS_API_URL: "",
  contract: {
    krl: {
      token: PRTNToken,
      staking: PRTNStaking,
    },
    genericABI,
  },
  RPC: isDevelopment
    ? "https://matic-mumbai.chainstacklabs.com"
    : "https://polygon-rpc.com/",

  chainId: isDevelopment ? 80001 : 137,
  networkList: {
    1: {
      name: "Ethereum",
    },
    137: {
      name: "Polygon Mainet",
    },
    80001: {
      name: "Polygon Testnet",
    },
  },
  mongoUri: "",
};

export default ProtonConfig;
