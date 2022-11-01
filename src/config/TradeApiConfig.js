import qs from "qs";
import apiConfig from "../config/apiConfig";

export default API_INFO = {
  publicAxiosConfig: {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    baseURL: apiConfig.TRADE_API_DOMAIN,
    timeout: 3000,
    transformRequest: (data, headers) => {
      return qs.stringify(data);
    },
  },
  ORDERBOOK: {
    API_CONFIG: {
      axiosType: null,
      endPoint: "v2/ticker/orderBook",
      params: null,
    },
    WS_CONFIG: {
      funcName: "orderBook",
      delYn: "N",
      pairName: "",
      debug: false,
    },
    DATA: {
      pairName: "",
    },
    PREPROCESS: data => {},
  },
  PUBLIC_SIGN_V2: {
    API_CONFIG: {
      axiosType: null,
      endPoint: "v2/ticker/publicSignV2",
      params: null,
    },
    WS_CONFIG: {
      funcName: "publicSignV2",
      delYn: "N",
      pairName: "",
      debug: false,
    },
    DATA: {
      pairName: "",
    },
    PREPROCESS: data => {},
    POSTPROCESS: data => {},
  },
};
