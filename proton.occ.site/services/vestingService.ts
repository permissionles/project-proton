import AppConfig from "@config/appConfig";
import { defaultWeb3 } from "utility/defaultWeb3";

const web3 = defaultWeb3();
const abi: any = AppConfig.contract.krl.vesting.abi;
const contract = new web3.eth.Contract(
  abi as any,
  AppConfig.contract.krl.vesting.address
);

const withdraw = (
  lockId: string | number,
  amount: number | string,
  from: string
) => {
  return contract.methods.withdraw(lockId, amount).send({ from });
};
const getUserLocks = (address: string) => {
  const contract = getRpcContract();
  return contract.methods.getUserLocks(address).call();
};
const getLock = (lockId: number) => {
  const contract = getRpcContract();
  return contract.methods.getLock(lockId).call();
};
const getWithdrawableTokens = (lockId: number) => {
  const contract = getRpcContract();
  return contract.methods.getWithdrawableTokens(lockId).call();
};

export const getRpcContract = () => {
  const web3 = defaultWeb3("http");
  const contract = new web3.eth.Contract(
    abi as any,
    AppConfig.contract.krl.vesting.address
  );
  return contract;
};

export { withdraw, getUserLocks, getLock, getWithdrawableTokens };
