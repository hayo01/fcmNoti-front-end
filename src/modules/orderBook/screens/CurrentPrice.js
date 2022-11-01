import { StyleSheet, Text, View } from "react-native";
import React from "react";

import TradeAPI from "../../../api/TradeAPI";
import WebSocketAPI from "../../../api/WebSocketAPI";
import API_INFO from "../../../config/TradeApiConfig";

export default function CurrentPrice() {
  const [rdsData, setRdsData] = React.useState({});
  const [apiReady, setApiReady] = React.useState(false);
  const [nowPrice, setNowPrice] = React.useState();
  const ws = React.useRef({});

  let pairName = "ETH/USDT";
  React.useEffect(() => {
    (async () => {
      let response = await TradeAPI.callPublicSignV2();

      if (response.status === "0") {
        setNowPrice(response.data[pairName].nowPrice);
      } else {
        console.error(`Can not get the Response > ${response}`);
      }
      setApiReady(!apiReady);
    })();

    return () => WebSocketAPI.wsCloseAll(ws.current);
  }, []);

  //API통신 성공하면, WebSocket연결
  React.useEffect(() => {
    if (apiReady) {
      API_INFO.PUBLIC_SIGN_V2.WS_CONFIG.setRdsData = setRdsData;

      ws.current = WebSocketAPI.addWebSocketEvent(
        API_INFO.PUBLIC_SIGN_V2.WS_CONFIG
      );
    }
  }, [apiReady]);

  //WS연결 성공하면, rdsData 변동 시마다 list 업데이트
  React.useEffect(() => {
    console.log(`rdsData pair > ${rdsData.pair}`);

    if (rdsData?.pair === pairName) {
      setNowPrice(rdsData.nowPrice);
      console.log("now price > ", nowPrice);
    }
  }, [rdsData]);

  return (
    <View style={styles.alignCenter}>
      <Text style={styles.impact}>{nowPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alignCenter: {
    flexDirection: "row",
    alignContent: "center",
  },
  impact: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
