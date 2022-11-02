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

export const getFiats = data => {
  let fiats = [];

  Object.keys(data).map(key => {
    fiats.push(key.split("/")[1]);
  });
  return fiats;
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
