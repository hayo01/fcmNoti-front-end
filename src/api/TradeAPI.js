import axios from "axios";

// TRADE-API 호출 Public Axios
const publicAxiosConfig = {
  baseURL: "https://test-trade-api.leo12.com",
  timeout: 30000,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    ua: "web",
  },
};

const publicTradeAxios = axios.create(publicAxiosConfig);

const TradeAPI = {
  callOrderBook: async function (pairName) {
    let form = new FormData();
    form.append("pairName", pairName);

    // let response = await publicTradeAxios.post(`/ticker/orderBook`, form);

    try {
      let response = await fetch(
        "https://test-trade-api.leo12.com/ticker/orderBook",
        {
          method: "POST",
          body: form,
        }
      );
      console.log(response);
      let result = await response.json();
      if (response.status !== 200) {
        throw new Error(`Got back HTTP status ${response.status}`);
      }
      return result.data;
    } catch (e) {
      console.error("EEEE > ", e);
    }
  },
};

export default TradeAPI;
