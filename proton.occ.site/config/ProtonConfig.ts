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
    ? "https://matic-testnet-archive-rpc.bwarelabs.com"
    : "https://matic-testnet-archive-rpc.bwarelabs.com",

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
