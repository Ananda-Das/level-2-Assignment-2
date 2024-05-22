import { Request, Response, NextFunction } from 'express';
import { orderValidationSchema } from './order.validation';
import { Order } from './order.interface';
import { orderServices } from './order.service';
import { productServices } from '../products/product.service';
import { ProductModel } from '../products/product.model';

const createNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newOrder = req.body;
    orderValidationSchema.parse(newOrder); // Validate incoming data using Zod

    const { productId, quantity: orderQuantity } = newOrder;
    const orderedProduct =
      await productServices.getSingleProductFromDB(productId);

    // Check if ordered quantity exceeds available inventory quantity
    const availableQuantity = orderedProduct?.inventory.quantity;
    if (availableQuantity === 0) {
      await ProductModel.findByIdAndUpdate(productId, {
        $set: { 'inventory.inStock': false },
      });
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    if (
      orderQuantity &&
      availableQuantity &&
      orderQuantity > availableQuantity
    ) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    await ProductModel.findByIdAndUpdate(productId, {
      $set: {
        'inventory.quantity': (availableQuantity as number) - orderQuantity,
      },
    });
    const result = await orderServices.createNewOrderIntoDB(newOrder);
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.query;
    const result = await orderServices.getAllOrdersFromDB(email as string);

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderControllers = {
  createNewOrder,
  getAllOrders,
};
