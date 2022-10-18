import { stocks } from "./contract/stocks";

const isDevelopment = process.env.NEXT_PUBLIC_ENV === "development";

export const AppConfig = {
  rpcNetwork: isDevelopment
    ? "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    : "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  stockTokenList: [
    {
      icon: "/images/icon/usdc.png",
      name: "USDC",
      address: "0x631709EBDD0A4ffE5740F00049B611586FF2aa76",
    },
    {
      icon: "/images/icon/USDT.png",
      name: "USDT",
      address: "0x631709EBDD0A4ffE5740F00049B611586FF2aa76",
    },
  ],
  contract: {
    stocks,
  },
  genericABI: [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
