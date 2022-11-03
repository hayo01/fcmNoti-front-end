export const setList = (data, fiat) => {
  let initialMarkets = [];

  Object.keys(data).map(key => {
    let coin = key.split("/");

    if (coin[1] === fiat)
      initialMarkets.push({
        coinName: coin[0],
        fiat: coin[1],
        pairName: key,
        price: data[key].nowPrice,
        change: data[key].changePercent,
        volume: data[key].tradeAmount,
      });
  });
  return initialMarkets;
};

export const fliterMarketList = (data, fiat, marketList) => {
  let showMarkets = [];
  let filteredMarkets = [];

  data.map(market => {
    if (market.marketName.includes(fiat) && market.tradePageShow === "ON")
      showMarkets.push(market.marketName);
  });

  marketList.map(market => {
    if (showMarkets.includes(market.pairName)) filteredMarkets.push(market);
  });

  return filteredMarkets;
};

export const updateMarkets = (markets, rdsData) => {
  markets.map(market => {
    if (market.pairName === rdsData.pairName) {
      market.price = rdsData.nowPrice;
      market.change = rdsData.changePercent;
      market.volme = rdsData.tradeAmount;
    }
  });
  return markets;
};
