import { Request, Response } from 'express';
import { getStockData, getMaxClosePrice, getAverageClosePrice } from '../services/stock.service';

export const getHighestClosingPrice = (req: Request, res: Response) => {
  const { symbol } = req.params;

  getStockData(symbol)
    .then(data => {
      const maxClosePrice = getMaxClosePrice(data);
      res.json({ symbol, maxClosePrice });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving stock data' });
    });
};

export const getHighestAverageClosingPrice = (req: Request, res: Response) => {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN'];
  let highestAverage = 0;
  let highestSymbol = '';

  const promises = symbols.map(symbol => getStockData(symbol));

  Promise.all(promises)
    .then(results => {
      results.forEach((data, index) => {
        const averageClosePrice = getAverageClosePrice(data);
        if (averageClosePrice > highestAverage) {
          highestAverage = averageClosePrice;
          highestSymbol = symbols[index];
        }
      });
      res.json({ symbol: highestSymbol, highestAverage });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving stock data' });
    });
};
