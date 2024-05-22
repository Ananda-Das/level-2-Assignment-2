import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/orders', OrderControllers.createNewOrder);

export const orderRoutes = router;
