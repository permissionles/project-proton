import axios, { AxiosResponse } from "axios";
import AppConfig from "../config/AppConfig";
import { defaultWeb3 } from "../utility/defaultWeb3";

const newsletterHost = "https://dig-common-api.herokuapp.com/";
export const subscribeToNewsletter = (data: any): Promise<AxiosResponse> => {
  return axios.post(`${newsletterHost}newsletter/subscribe`, data);
};

const web3 = defaultWeb3();
const abi: any = AppConfig.contract.genericABI;

const approveToken = (
  contractAddress: string,
  spender: string,
  amount: any,
  from: string
) => {
  const contract = new web3.eth.Contract(abi as any, contractAddress);
  return contract.methods.approve(spender, amount).send({ from });
};
const balanceOf = (contractAddress: string, address: string) => {
  const web3 = defaultWeb3("http");
  const contract = new web3.eth.Contract(abi as any, contractAddress);
  return contract.methods.balanceOf(address).call();
};
const allowance = (contractAddress: string, owner: string, spender: string) => {
  const web3 = defaultWeb3("http");
  const contract = new web3.eth.Contract(abi as any, contractAddress);
  return contract.methods.allowance(owner, spender).call();
};

export { approveToken, balanceOf, allowance };
