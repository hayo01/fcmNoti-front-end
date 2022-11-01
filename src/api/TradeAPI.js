import axios from "axios";
import { Utils } from "../Utils";
import API_INFO from "../config/TradeApiConfig";

let publicTradeAxios;
(async () => {
  publicTradeAxios = await axios.create(API_INFO.publicAxiosConfig);
})();

let response;
const TradeAPI = {
  callPublicSignV2: async () => {
    console.log("Call publicSignV2 > ");
    API_INFO.PUBLIC_SIGN_V2.API_CONFIG.axiosType = publicTradeAxios;

    response = await Utils.axiosGet(API_INFO.PUBLIC_SIGN_V2.API_CONFIG);

    return response;
  },

  callOrderBook: async pairName => {
    console.log(`Call OrderBook > ${pairName}`);
    API_INFO.ORDERBOOK.API_CONFIG.axiosType = publicTradeAxios;
    API_INFO.ORDERBOOK.DATA.pairName = pairName;
    API_INFO.ORDERBOOK.API_CONFIG.params = API_INFO.ORDERBOOK.DATA;

    response = await Utils.axiosGet(API_INFO.ORDERBOOK.API_CONFIG);

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
