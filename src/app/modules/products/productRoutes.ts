import express from 'express';
import { ProductControllers } from './productController';

const router = express.Router();

router.post('/products', ProductControllers.createNewProduct);
router.get('/products', ProductControllers.getAllProducts);

export const productRoutes = router;
