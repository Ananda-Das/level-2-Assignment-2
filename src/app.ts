import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/products/productRoutes';
import { orderRoutes } from './app/modules/order/orderRoutes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
