import { Router } from 'express';
import { getHighestClosingPrice, getHighestAverageClosingPrice } from '../controllers/stock.controller';

const router = Router();

// Endpoint para obtener el precio de cierre más alto de una acción específica
router.get('/highest-closing-price/:symbol', getHighestClosingPrice);

// Endpoint para obtener el promedio de precio de cierre más alto de un conjunto de acciones
router.get('/highest-average-closing-price', getHighestAverageClosingPrice);

export default router;
