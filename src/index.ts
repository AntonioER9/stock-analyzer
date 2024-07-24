import express from 'express';
import { getHighestClosingPrice, getHighestAverageClosingPrice } from './stockAnalyzer';

const app = express();
const port = 3000;

app.get('/highest-closing-price', async (req, res) => {
    const symbol = req.query.symbol as string;
    if (!symbol) {
        return res.status(400).send('Symbol query parameter is required');
    }
    try {
        const highestClosingPrice = await getHighestClosingPrice(symbol);
        res.json({ symbol, highestClosingPrice });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/highest-average-closing-price', async (req, res) => {
    const symbols = (req.query.symbols as string)?.split(',') || [];
    if (symbols.length === 0) {
        return res.status(400).send('Symbols query parameter is required');
    }
    try {
        const highestAverageClosingPrice = await getHighestAverageClosingPrice(symbols);
        res.json(highestAverageClosingPrice);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
