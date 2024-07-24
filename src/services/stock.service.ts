import { StockData, TimeSeriesDaily } from '../models/stock.model';

const ALPHA_VANTAGE_API_KEY = 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

const stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];

export const fetchHighestClosingPrice = async (stock: string) => {
  let highestPrice = 0;

  const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${ALPHA_VANTAGE_API_KEY}`);
  const data: StockData = await response.json();
  const timeSeries: TimeSeriesDaily = data['Time Series (Daily)'];

  for (const date in timeSeries) {
    const closePrice = parseFloat(timeSeries[date]['4. close']);
    if (closePrice > highestPrice) {
      highestPrice = closePrice;
    }
  }

  return { stock: stock, highestClosingPrice: highestPrice };
};

export const fetchHighestAverageClosingPrice = async () => {
  let highestAvgPrice = 0;
  let highestStock = '';

  for (const stock of stocks) {
    const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const data: StockData = await response.json();
    const timeSeries: TimeSeriesDaily = data['Time Series (Daily)'];

    let total = 0;
    let count = 0;

    for (const date in timeSeries) {
      total += parseFloat(timeSeries[date]['4. close']);
      count++;
    }

    const avgPrice = total / count;
    if (avgPrice > highestAvgPrice) {
      highestAvgPrice = avgPrice;
      highestStock = stock;
    }
  }

  return { stock: highestStock, highestAverageClosingPrice: highestAvgPrice };
};
