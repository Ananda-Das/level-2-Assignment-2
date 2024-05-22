import express from 'express';
import { ProductControllers } from './productController';

const router = express.Router();

// route.post('/', studentControllers.createNewProduct);
router.post('/products', ProductControllers.createNewProduct);
// router.get('/products', getProducts);

export const productRoutes = router;
