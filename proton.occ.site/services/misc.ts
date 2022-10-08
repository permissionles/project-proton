import ProtonConfig from "@config/ProtonConfig";
import axios, { AxiosResponse } from "axios";
import { ethers } from "ethers";

const newsletterHost = "";
export const subscribeToNewsletter = (data: any): Promise<AxiosResponse> => {
  return axios.post(`${newsletterHost}newsletter/subscribe`, data);
};

// const web3 = defaultWeb3();
const abi: any = ProtonConfig.contract.genericABI;

// const approveToken = (
//   contractAddress: string,
//   spender: string,
//   amount: any,
//   from: string
// ) => {
//   const contract = new web3.eth.Contract(abi as any, contractAddress);
//   return contract.methods.approve(spender, amount).send({ from });
// };
const balanceOf = (contractAddress: string, address: string) => {
  // const web3 = defaultWeb3("http");
  var customHttpProvider = new ethers.providers.JsonRpcProvider(
    ProtonConfig.RPC
  );
  let contract = new ethers.Contract(
    contractAddress,
    abi as any,
    customHttpProvider
  );
  return contract.balanceOf(address);
};
const allowance = (contractAddress: string, owner: string, spender: string) => {
  var customHttpProvider = new ethers.providers.JsonRpcProvider(
    ProtonConfig.RPC
  );
  let contract = new ethers.Contract(
    contractAddress,
    abi as any,
    customHttpProvider
  );
  return contract.allowance(owner, spender);
};

export { balanceOf, allowance };
