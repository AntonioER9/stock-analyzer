const API_KEY = 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

interface TimeSeries {
  [date: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

interface StockData {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
  };
  'Time Series (Daily)': TimeSeries;
}

async function fetchStockData(symbol: string): Promise<StockData> {
  const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
  const data = await response.json();
  if (data['Error Message']) {
    throw new Error(`Error fetching data for symbol: ${symbol}`);
  }
  return data as StockData;
}

export async function getHighestClosingPrice(symbol: string): Promise<number> {
  const data = await fetchStockData(symbol);
  const timeSeries = data['Time Series (Daily)'];
  let highestClosingPrice = 0;

  for (const date in timeSeries) {
    const closingPrice = parseFloat(timeSeries[date]['4. close']);
    if (closingPrice > highestClosingPrice) {
      highestClosingPrice = closingPrice;
    }
  }

  return highestClosingPrice;
}

export async function getHighestAverageClosingPrice(symbols: string[]): Promise<{ symbol: string, averageClosingPrice: number }> {
  let highestAverage = 0;
  let highestSymbol = '';

  for (const symbol of symbols) {
    const data = await fetchStockData(symbol);
    const timeSeries = data['Time Series (Daily)'];
    let totalClosingPrice = 0;
    let count = 0;

    for (const date in timeSeries) {
      totalClosingPrice += parseFloat(timeSeries[date]['4. close']);
      count++;
    }

    const averageClosingPrice = totalClosingPrice / count;
    if (averageClosingPrice > highestAverage) {
      highestAverage = averageClosingPrice;
      highestSymbol = symbol;
    }
  }

  return { symbol: highestSymbol, averageClosingPrice: highestAverage };
}
