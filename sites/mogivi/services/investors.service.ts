import axios from "apis/axios";
import API_URL from "const/api-url";

class InvestorsService {
  getTopInvestor = (quantity: number): Promise<any> => {
    return axios.get(API_URL.GET_TOP_INVESTOR + quantity);
  };
}

export const investorsService = new InvestorsService();
