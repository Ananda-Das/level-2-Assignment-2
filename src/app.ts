import express, { Application, NextFunction, Request, Response } from 'express';
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

// Middleware for unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: err,
  });
});

export default app;
