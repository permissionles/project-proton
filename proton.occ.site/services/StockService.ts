import axios, { AxiosResponse } from "axios";
import { AppConfig } from "../config/AppConfig";

export const getRewardList = (): Promise<AxiosResponse> => {

    return axios.post(`${AppConfig.contract.stocks.graphAPI}`, {
        query: `{
            rewards{
              id
              tokensDeposited
              tokensDistributed
            }
          }
      `,
    });
};
