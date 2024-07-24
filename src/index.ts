import express from 'express';
import stockRoutes from './routes/stock.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/stocks', stockRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
