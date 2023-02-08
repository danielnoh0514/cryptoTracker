export function fetchCoins() {
  return fetch(`https://api.coinpaprika.com/v1/coins`).then((infoData) =>
    infoData.json()
  );
}

export async function fetchCoinTickers(coinId: string) {
  const priceData = await (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  ).json();

  return priceData;
}

export async function fetchCoinInfo(coinId: string) {
  const infoData = await (
    await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}
    `)
  ).json();

  return infoData;
}

export function fetchCoinChart(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((respons) => respons.json());
}
