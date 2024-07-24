import { Request, Response } from 'express';
import { fetchHighestClosingPrice, fetchHighestAverageClosingPrice } from '../services/stock.service';

export const getHighestClosingPrice = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const result = await fetchHighestClosingPrice(symbol);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getHighestAverageClosingPrice = async (req: Request, res: Response) => {
  try {
    const result = await fetchHighestAverageClosingPrice();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};