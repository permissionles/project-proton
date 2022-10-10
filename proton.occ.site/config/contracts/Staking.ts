export const KRLStaking = {
  address:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      ? "0xE064E69A6ed323044A27435646443Ca10A39643C"
      : "0xE064E69A6ed323044A27435646443Ca10A39643C",
  package: [
    {
      month: 1,
      apr: 1,
    },
    {
      month: 4,
      apr: 6,
    },
    {
      month: 12,
      apr: 30,
    },
  ],

  abi: [
    {
      inputs: [
        { internalType: "contract IERC20", name: "add_", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256[]",
          name: "APYs",
          type: "uint256[]",
        },
      ],
      name: "APYSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "poolId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "stakeId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "wallet",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "startTime",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "endTime",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "collected",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "claimed",
          type: "uint256",
        },
      ],
      name: "StakingUpdate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "poolId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "stakeId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "wallet",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "rewardsClaimed",
      type: "event",
    },
    {
      inputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "APY",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "Stakes",
      outputs: [
        { internalType: "uint256", name: "poolId", type: "uint256" },
        { internalType: "uint256", name: "stakeId", type: "uint256" },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "startTime", type: "uint256" },
        { internalType: "uint256", name: "endTime", type: "uint256" },
        { internalType: "uint256", name: "months", type: "uint256" },
        { internalType: "bool", name: "collected", type: "bool" },
        { internalType: "uint256", name: "claimed", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "poolId", type: "uint256" },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "st", type: "uint256" },
        { internalType: "uint256", name: "et", type: "uint256" },
        { internalType: "uint256", name: "m", type: "uint256" },
        { internalType: "bool", name: "collected", type: "bool" },
        { internalType: "uint256", name: "claimed", type: "uint256" },
      ],
      name: "addStakes",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "stakeId", type: "uint256" }],
      name: "claimRewards",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "poolId", type: "uint256" }],
      name: "getAPY",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "wallet", type: "address" },
        { internalType: "uint256", name: "stakeId", type: "uint256" },
      ],
      name: "getCurrentRewards",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "wallet", type: "address" }],
      name: "getStakes",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "poolId", type: "uint256" },
            { internalType: "uint256", name: "stakeId", type: "uint256" },
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "startTime", type: "uint256" },
            { internalType: "uint256", name: "endTime", type: "uint256" },
            { internalType: "uint256", name: "months", type: "uint256" },
            { internalType: "bool", name: "collected", type: "bool" },
            { internalType: "uint256", name: "claimed", type: "uint256" },
          ],
          internalType: "struct ProtonStaking.stakes[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalClaimed",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "wallet", type: "address" },
        { internalType: "uint256", name: "stakeId", type: "uint256" },
      ],
      name: "getTotalRewards",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "poolId", type: "uint256" },
        { internalType: "bool", name: "status", type: "bool" },
      ],
      name: "pausePool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "poolId", type: "uint256" },
        { internalType: "uint256[]", name: "apys", type: "uint256[]" },
      ],
      name: "setAPYs",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "poolId", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "months", type: "uint256" },
      ],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "stakesAllowed",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "stakeId", type: "uint256" }],
      name: "unStake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
