import { FlatList, StyleSheet } from "react-native";
import React from "react";

import TradeAPI from "../../../api/TradeAPI";
import WebSocketAPI from "../../../api/WebSocketAPI";
import API_INFO from "../../../config/TradeApiConfig";
import {
  fliterMarketList,
  setList,
  updateMarkets,
} from "../utils/marketListUtils";
import RenderMarket from "./RenderMarket";
import SearchBar from "./SearchBar";
import FiatTab from "./FiatTab";

export default function MarketList() {
  const [rdsData, setRdsData] = React.useState({});
  const [apiReady, setApiReady] = React.useState(false);
  const ws = React.useRef({});

  const [fiat, setFiat] = React.useState("USDT");

  let initialMarkets = [];
  const [markets, setMarkets] = React.useState([]);
  const [searchList, setSearchList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      let response = await TradeAPI.callPublicSignV2();
      let marketRes = await TradeAPI.callMarketList();

      if (response.status === "0" && marketRes.status === "0") {
        initialMarkets = setList(response.data, fiat);
        let filteredMarkets = fliterMarketList(
          marketRes.data,
          fiat,
          initialMarkets
        );

        setMarkets(filteredMarkets);

        setApiReady(true);
      } else console.error(`Can not get the Response > ${response}`);
    })();

    return () => WebSocketAPI.wsCloseAll(ws.current);
  }, [fiat]);

  React.useEffect(() => {
    if (apiReady) {
      API_INFO.PUBLIC_SIGN_V2.WS_CONFIG.setRdsData = setRdsData;

      ws.current = WebSocketAPI.addWebSocketEvent(
        API_INFO.PUBLIC_SIGN_V2.WS_CONFIG
      );
    }
  }, [apiReady]);

  React.useEffect(() => {
    if (apiReady && rdsData?.pairName.split("/")[1] === fiat) {
      setMarkets(updateMarkets(markets, rdsData));
    }
  }, [rdsData]);

  return (
    <>
      <FiatTab setFiat={setFiat} nowFiat={fiat} />
      <SearchBar markets={markets} setSearchList={setSearchList} />
      {searchList.length !== 0 ? (
        <FlatList
          data={searchList}
          renderItem={({ item }) => <RenderMarket item={item} />}
          keyExtractor={(item, idx) => idx}
        />
      ) : (
        <FlatList
          data={markets}
          renderItem={({ item }) => <RenderMarket item={item} />}
          keyExtractor={(item, idx) => idx}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
