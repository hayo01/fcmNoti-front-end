import apiConfig from "../config/apiConfig";

const WebSocketAPI = {
  wsCloseAll: ws => {
    ws.onclose();
  },

  addWebSocketEvent: config => {
    let { setRdsData, funcName, delYn, pairName, debug } = config;
    const ws = new WebSocket(apiConfig.TRADE_WEBSOCKET_DOMAIN);

    ws.onopen = () => {
      // connection opened
      console.log(`connected > ${funcName} > ${JSON.stringify(ws)}`);

      try {
        ws.send(
          JSON.stringify({
            funcName: funcName,
            pairName: pairName,
            delYn: delYn,
          })
        );
      } catch (err) {
        if (debug) console.error(err);
      }
    };

    ws.onmessage = e => {
      // a message was received
      if (e.data !== "RDS WebSocket Connected")
        try {
          setRdsData(JSON.parse(e.data));
        } catch (error) {
          console.error("WS ERROR > ", error);
        }
    };

    ws.onerror = e => {
      // an error occurred
      if (debug) console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log("ws is closed");
      if (debug) console.log(e);
    };

    return ws;
  },
};

export default WebSocketAPI;
