import { stocks } from "./contract/stocks";

export const AppConfig = {
  stockTokenList: [
    {
      icon: "/images/icon/usdc.png",
      name: "USDC",
      address: "0x631709EBDD0A4ffE5740F00049B611586FF2aa76",
    },
    {
      icon: "/images/icon/usdt.png",
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
