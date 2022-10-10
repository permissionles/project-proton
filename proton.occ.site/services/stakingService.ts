import AppConfig from "@config/appConfig";
import { defaultWeb3 } from "utility/defaultWeb3";

const web3 = defaultWeb3();
const abi: any = AppConfig.contract.krl.staking.abi;
const contract = new web3.eth.Contract(
  abi as any,
  AppConfig.contract.krl.staking.address
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
  return contract.methods.stake(poolId, amount, months).send({ from });
};
const unStakeToken = (stakeId: number, from: string) => {
  return contract.methods.unStake(stakeId).send({ from });
};
const getStakes = (address: string) => {
  const contract = getRpcContract();
  return contract.methods.getStakes(address).call();
};
const getCurrentRewards = (address: string, stakeId: number) => {
  const contract = getRpcContract();
  return contract.methods.getCurrentRewards(address, stakeId).call();
};
const claimRewards = (stakeId: number, from: string) => {
  return contract.methods.claimRewards(stakeId).send({ from });
};
const rewardsClaimed = () => {
  const contract = getRpcContract();
  return contract.methods.rewardsClaimed().call();
};

export const getRpcContract = () => {
  const web3 = defaultWeb3("http");
  const contract = new web3.eth.Contract(
    abi as any,
    AppConfig.contract.krl.staking.address
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
