import express from 'express';
import { addStock, manageStock, getStockItem, editStock, deleteStockItem } from '../controllers/stockcontollers.js';

const router = express.Router();

router.post('/add_stock', addStock);
router.get('/manage_stock', manageStock);
router.get('/stockitem/:id', getStockItem);
router.put('/edit_stock/:id', editStock);
router.delete('/delete_item/:id', deleteStockItem);

export { router as Stockrouter };
