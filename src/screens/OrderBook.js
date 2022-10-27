import { FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import WebSocketAPI from "../api/WebSocketAPI";
import TradeAPI from "../api/TradeAPI";
import { renderOrderBook } from "./components/renderOrderBook";
import { Utils } from "../Utils";

export default function OrderBook() {
  const [rdsData, setRdsData] = React.useState({});
  const [orderBook, setOrderBook] = React.useState({});

  let buyList = React.useRef([]);
  let sellList = React.useRef([]);

  let orderCount = React.useRef(0);

  const setBuyList = list => {
    buyList.current = [...list];
  };
  const setSellList = list => {
    sellList.current = [...list];
  };

  React.useEffect(() => {
    (async () => {
      let ob = await TradeAPI.callOrderBook("ETH/USDT");
      console.log(`get OB > `);
      console.log(ob);
      setOrderBook(ob);

      ob.buyList = ob.buyList.filter(element => {
        if (Number(element.amount) < 0) console.error(element);
        return Number(element.amount) > 0;
      });
      ob.sellList = ob.sellList.filter(element => Number(element.amount) > 0);

      setBuyList(ob.buyList);
      setSellList(ob.sellList);
    })();

    WebSocketAPI.addWebSocketEvent(
      "orderBook",
      "ETH/USDT",
      setRdsData,
      "N",
      false
    );

    return () => {
      WebSocketAPI.wsCloseAll();
    };
  }, []);

  React.useEffect(() => {
    if (!Utils.isEmpty(rdsData)) {
      // console.log(rdsData);
      updateLists(rdsData);
    }
  }, [rdsData]);

  const updateLists = PRdsData => {
    // console.log(`updateLists in!`);

    let newBuyData = PRdsData.buy;
    let newSellData = PRdsData.sell;

    // setBuyList(PRdsData.buy);

    sortList(buyList, newBuyData, "A");
    sortList(sellList, newSellData, "D");
  };
  /* ------------------------------------------------------- */
  /*
1. 새로 들어온 rdsData를 buyList/ sellList 안에 있는 값들과 비교하여 정렬
2. 새 rdsData가 추가/수정 된 List를 set해서 return
*/
  const sortList = (list, newdata, mode) => {
    if (newdata.length === 0) return;

    let newData = newdata[0];
    let result = findOrderPosition(list, newData, mode);

    if (result.mode === "I") list.current.splice(result.index, 0, newData);
    else assignOrder(result.index, list, newData);
  };

  const findOrderPosition = (sourceOrder, newOrder, mode) => {
    console.log(newOrder);
    let result = {
      index: 0,
      mode: "I",
    };

    let exact = sourceOrder.current.findIndex(
      element => Number(element.price) === Number(newOrder.price)
    );

    if (exact >= 0) {
      result.index = exact;
      result.mode = "U";
      return result;
    }
    let pos;
    if (mode === "A") {
      pos = sourceOrder.current.findIndex(
        element => Number(element.price) < Number(newOrder.price)
      );
    } else if (mode === "D") {
      pos = sourceOrder.current.findIndex(
        element => Number(element.price) > Number(newOrder.price)
      );
    }

    result.index = pos;
    result.mode = "I";

    return result;
  };

  const assignOrder = (i, sourceOrder, newOrder) => {
    sourceOrder.current[i].amount =
      Number(sourceOrder.current[i]?.amount) + Number(newOrder.amount);

    if (Number(sourceOrder.current[i].amount) <= 0) {
      sourceOrder.current.splice(i, 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.sellList}>
        <FlatList
          data={sellList.current.slice(0, 15).reverse()}
          renderItem={renderOrderBook}
          keyExtractor={(item, idx) => idx}
        />
      </View>
      <View style={styles.buyList}>
        <FlatList
          data={buyList.current.slice(0, 15)}
          renderItem={renderOrderBook}
          keyExtractor={(item, idx) => idx}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buyList: {
    flex: 1,
  },
  sellList: {
    flex: 1,
    marginBottom: 10,
  },
});
