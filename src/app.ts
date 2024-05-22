import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/products/productRoutes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api', productRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
