import { FlatList, StyleSheet, Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import WebSocketAPI from "../../../api/WebSocketAPI";
import TradeAPI from "../../../api/TradeAPI";
import API_INFO from "../../../config/TradeApiConfig";
import { RenderOrderBook } from "./RenderOrderBook";
import CurrentPrice from "./CurrentPrice";
import { Utils } from "../../../Utils";
import { sortList } from "../utils/sortList";

export default function OrderBook(props) {
  const pairName = props?.route.params.pairName;

  const navi = useNavigation();

  const [rdsData, setRdsData] = React.useState({});
  const [apiReady, setApiReady] = React.useState(false);
  const [wsReady, setWsReady] = React.useState(false);
  const ws = React.useRef({});

  let buyList = React.useRef([]);
  let sellList = React.useRef([]);

  const setBuyList = list => {
    buyList.current = [...list];
  };
  const setSellList = list => {
    sellList.current = [...list];
  };

  //첫 페이지 렌더링
  React.useEffect(() => {
    (async () => {
      let response = await TradeAPI.callOrderBook(pairName);

      if (response.status === "0") {
        setBuyList(response.data.buyList);
        setSellList(response.data.sellList);

        setApiReady(!apiReady);
      } else {
        Alert.alert("Wrong request!");
        navi.goBack();
      }
    })();
    return () => {
      WebSocketAPI.wsCloseAll(ws.current);
    };
  }, []);

  //API통신 성공하면, WebSocket연결
  React.useEffect(() => {
    if (apiReady) {
      API_INFO.ORDERBOOK.WS_CONFIG.setRdsData = setRdsData;
      API_INFO.ORDERBOOK.WS_CONFIG.pairName = pairName;

      ws.current = WebSocketAPI.addWebSocketEvent(API_INFO.ORDERBOOK.WS_CONFIG);
      //WS연결이 제대로 되었는지 확인할 수 있는 방법이 있나?
      setWsReady(!wsReady);
    }
  }, [apiReady]);

  //WS연결 성공하면, rdsData 변동 시마다 list 업데이트
  React.useEffect(() => {
    if (wsReady && !Utils.isEmpty(rdsData)) {
      updateLists(rdsData);
    }
  }, [wsReady, rdsData]);

  const updateLists = PRdsData => {
    let newBuyData = Utils.undefinedToArray(PRdsData.buy);
    let newSellData = Utils.undefinedToArray(PRdsData.sell);

    sortList(buyList, newBuyData, "A");
    sortList(sellList, newSellData, "D");
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <FlatList
        style={styles.sellList}
        showsVerticalScrollIndicator
        data={sellList.current.slice(0, 15).reverse()}
        renderItem={RenderOrderBook}
        keyExtractor={(item, idx) => idx}
      />
      <CurrentPrice />
      <FlatList
        style={styles.buyList}
        showsVerticalScrollIndicator
        data={buyList.current.slice(0, 15)}
        renderItem={RenderOrderBook}
        keyExtractor={(item, idx) => idx}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buyList: {
    height: "50%",
  },
  sellList: {
    height: "50%",
    // marginBottom: 10,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
});
