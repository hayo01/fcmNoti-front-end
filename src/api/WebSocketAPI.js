let ws;

const WebSocketAPI = {
  wsCloseAll: function () {
    return ws.onclose();
  },

  addWebSocketEvent: function (
    funcName,
    pairName,
    setRdsData,
    delYn,
    debug = false
  ) {
    ws = new WebSocket("https://test-trade-api.leo12.com/rds");

    ws.onopen = () => {
      // connection opened
      console.log("connected");

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
      if (debug) console.log(e.data);

      if (e.data !== "RDS WebSocket Connected")
        try {
          setRdsData(JSON.parse(e.data));
        } catch (error) {
          setRdsData(e.data);
        }
    };

    ws.onerror = e => {
      // an error occurred
      if (debug) console.log(e.message);
    };

    ws.onclose = e => {
      console.log("ws is closed");
      // connection closed
      if (debug) console.log(e);
    };
  },
};

export default WebSocketAPI;
