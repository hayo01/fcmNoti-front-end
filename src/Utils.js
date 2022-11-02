export const Utils = {
  isEmpty: param => {
    return Object.keys(param).length === 0;
  },
  undefinedToArray: param => {
    return param === undefined ? [] : param;
  },

  axiosGet: async config => {
    // console.log(`axiosGet invoked >`);
    let { axiosType, endPoint, params } = config;
    let response, errormessage;

    let result = { data: {}, status: "", message: "" };

    try {
      response = await axiosType.get(endPoint, { params: params });
      if (response.data.status !== "0") {
        response.data.data = [];
      }
    } catch (error) {
      error => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.error("DATA", error.response.data);
          console.error("STATUS", error.response.status);
          console.error("HEADER", error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          errormessage = error.request._response;
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.error("Error", error.message);
        }
        console.error("CONFIG", error.config);
      };
    }

    if (errormessage) {
      result.data = {};
      result.data.message = errormessage.toString();
      result.data.status = "9988";
      return result;
    } else return response.data;
  },
};
