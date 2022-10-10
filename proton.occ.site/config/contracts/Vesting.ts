export const Vesting = {
  address:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? "0x2e9438122d8e2f8385e0b29d4be304465500ae0e"
      : "0x2e9438122d8e2f8385e0b29d4be304465500ae0e",

  abi: [
    {
      inputs: [
        { internalType: "uint256", name: "_lockID", type: "uint256" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_lockID", type: "uint256" }],
      name: "getLock",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "tokensDeposited",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "tokensWithdrawn",
              type: "uint256",
            },
            { internalType: "uint256", name: "startEmission", type: "uint256" },
            { internalType: "uint256", name: "endEmission", type: "uint256" },
            { internalType: "uint256", name: "lockID", type: "uint256" },
            { internalType: "address", name: "owner", type: "address" },
          ],
          internalType: "struct TokenVesting.TokenLock",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "user", type: "address" }],
      name: "getUserLocks",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_lockID", type: "uint256" }],
      name: "getWithdrawableTokens",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};
