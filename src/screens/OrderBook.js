import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import WebSocketAPI from "../api/WebSocketAPI";
import TradeAPI from "../api/TradeAPI";
import { renderOrderBook } from "./components/renderOrderBook";
import { Utils } from "../Utils";

let count = 0;

export default function OrderBook() {
  const [rdsData, setRdsData] = React.useState({});
  const [orderBook, setOrderBook] = React.useState({});
  const [buyList, setBuyList] = React.useState([]);
  const [sellList, setSellList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const ob = await TradeAPI.callOrderBook("ETH/USDT");
      console.log(`get OB > `);
      console.log(ob);

      setOrderBook(ob);
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
      console.log(rdsData);
      updateLists(rdsData);
      count++;
    }
  }, [rdsData]);

  /* ------------------------------------------------------- */
  /*
1. 새로 들어온 rdsData를 buyList/ sellList 안에 있는 값들과 비교하여 정렬
2. 새 rdsData가 추가/수정 된 List를 set해서 return
*/
  const sortBuyList = newBuyData => {
    console.log(newBuyData);

    for (let i = 0; i < buyList.length; i++) {
      if (buyList[i].price > newBuyData.price) {
        buyList.push(newBuyData);
        let tempList = buyList.sort(function (a, b) {
          return a.price - b.price;
        });
        return setBuyList(tempList);
      }

      if (buyList[i].price === newBuyData.price) {
        buyList[i].amount =
          Number(buyList[i].amount) + Number(newBuyData.amount);
        return buyList;
      }
      continue;
    }
  };
  const sortSellList = newSellData => {
    console.log(newSellData);

    for (let i = 0; i < sellList.length; i++) {
      if (sellList[i].price < newSellData.price) {
        sellList.push(newSellData);
        let tempList = sellList.sort(function (a, b) {
          return b.price - a.price;
        });
        return setSellList(tempList);
      }

      if (sellList[i].price === newSellData.price) {
        sellList[i].amount =
          Number(sellList[i].amount) + Number(newSellData.amount);
        return sellList;
      }
      continue;
    }
  };

  const updateLists = PRdsData => {
    console.log(`updateLists in!`);

    let newBuyData = PRdsData.buy;
    let newSellData = PRdsData.sell;

    if (newBuyData.length !== 0) sortBuyList(newBuyData[0]);
    if (newSellData.length !== 0) sortSellList(newSellData[0]);
  };

  return (
    <View>
      <View style={styles.buyList}>
        <FlatList
          data={buyList.slice(0, 15)}
          renderItem={renderOrderBook}
          keyExtractor={(item, idx) => idx}
        />
      </View>
      <View style={styles.sellList}>
        <FlatList
          data={sellList.slice(0, 15)}
          renderItem={renderOrderBook}
          keyExtractor={(item, idx) => idx}
        />
      </View>
      <Text>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buyList: {
    borderStyle: "solid",
    borderWidth: "5",
    borderColor: "#43A06C",
    marginBottom: 10,
  },
  sellList: {
    borderStyle: "solid",
    borderWidth: "5",
    borderColor: "#63AADE",
  },
});
