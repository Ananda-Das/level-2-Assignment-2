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

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Assignment-2 server is running',
  });
});

// Middleware for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: err,
  });
});

export default app;
