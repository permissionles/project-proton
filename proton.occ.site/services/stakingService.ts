import ProtonConfig from "@config/ProtonConfig";
import { ethers } from "ethers";

// const web3 = defaultWeb3();
const abi: any = ProtonConfig.contract.proton.staking.abi;

const contract = new ethers.Contract(
  ProtonConfig.contract.proton.staking.address,
  abi as any
);

const stakeToken = (poolId: any, amount: any, months: any, from: any) => {
  console.log(
    "Pool ID: ",
    poolId,
    "Amount: ",
    amount,
    "Months: ",
    months,
    "From: ",
    from
  );
  return contract.stake(poolId, amount, months).send({ from });
};
const unStakeToken = (stakeId: number, from: string) => {
  return contract.methods.unStake(stakeId).send({ from });
};
const getStakes = (address: string) => {
  const contract = getRpcContract();
  return contract.getStakes(address);
};
const getCurrentRewards = (address: string, stakeId: number) => {
  const contract = getRpcContract();
  return contract.getCurrentRewards(address, stakeId);
};
const claimRewards = (stakeId: number, from: string) => {
  return contract.methods.claimRewards(stakeId).send({ from });
};
const rewardsClaimed = () => {
  const contract = getRpcContract();
  return contract.rewardsClaimed();
};

export const getRpcContract = () => {
  var customHttpProvider = new ethers.providers.JsonRpcProvider(
    ProtonConfig.RPC
  );
  let contract = new ethers.Contract(
    ProtonConfig.contract.proton.staking.address,
    abi,
    customHttpProvider
  );
  return contract;
};

export {
  stakeToken,
  unStakeToken,
  getStakes,
  getCurrentRewards,
  claimRewards,
  rewardsClaimed,
};
