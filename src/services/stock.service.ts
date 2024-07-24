const ALPHA_VANTAGE_API_KEY = 'demo';

export const getStockData = (symbol: string): Promise<any> => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      throw new Error('Error retrieving stock data');
    });
};

export const getMaxClosePrice = (data: any): number => {
  const timeSeries = data['Time Series (Daily)'];
  let maxClose = 0;

  for (const date in timeSeries) {
    const closePrice = parseFloat(timeSeries[date]['4. close']);
    if (closePrice > maxClose) {
      maxClose = closePrice;
    }
  }

  return maxClose;
};

export const getAverageClosePrice = (data: any): number => {
  const timeSeries = data['Time Series (Daily)'];
  let totalClose = 0;
  let count = 0;

  for (const date in timeSeries) {
    totalClose += parseFloat(timeSeries[date]['4. close']);
    count++;
  }

  return totalClose / count;
};
