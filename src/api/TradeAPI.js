import axios from "axios";
import qs from "qs";
import { Utils } from "../Utils";
import apiConfig from "../config/apiConfig";

// TRADE-API 호출 Public Axios
const publicAxiosConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  baseURL: apiConfig.TRADE_API_DOMAIN,
  timeout: 3000,
  transformRequest: (data, headers) => {
    return qs.stringify(data);
  },
};

let API_INFO = {
  ORDERBOOK: {
    ENDPOINT: "v2/ticker/orderBook",
    DATA: {
      pairName: "",
    },
  },
  PUBLIC_SIGN_V2: {
    ENDPOINT: "v2/ticker/publicSignV2",
  },
};
let publicTradeAxios;
(async () => {
  publicTradeAxios = await axios.create(publicAxiosConfig);
})();

let response;
const TradeAPI = {
  callPublicSignV2: async () => {
    response = await Utils.axiosGet(
      publicTradeAxios,
      API_INFO.PUBLIC_SIGN_V2.ENDPOINT
    );
    return response;
  },
  callOrderBook: async pairName => {
    API_INFO.ORDERBOOK.DATA.pairName = pairName;
    response = await Utils.axiosGet(
      publicTradeAxios,
      API_INFO.ORDERBOOK.ENDPOINT,
      API_INFO.ORDERBOOK.DATA
    );
    return response;
  },
};

/*  fetchAPI를 이용 > IOS에서 'pretty...' 버그발생

const TradeAPI = {
  callOrderBook: async function (pairName) {
    let form = new FormData();
    form.append("pairName", pairName);

    try {
      let response = await fetch(
        apiConfig.TRADE_API_DOMAIN +"/ticker/orderBook",
        {
          method: "POST",
          body: form,
        }
      );

      let result = await response.json();
      if (response.status !== 200) {
        throw new Error(`Got back HTTP status ${response.status}`);
      }
      return result.data;
    } catch (e) {
      console.error("TradeAPI ERROR > ", e);
    }
  },
};
*/

export default TradeAPI;
