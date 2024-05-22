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
    orderValidationSchema.parse(newOrder); //validate incoming data using zod

    const { productId, quantity: orderQuantity } = newOrder;
    const orderedProduct =
      await productServices.getSingleProductFromDB(productId);

    //  check if ordered quantity excceeds available inventory quantity
    const availableQuantity = orderedProduct?.inventory.quantity;
    if (availableQuantity === 0) {
      await ProductModel.findByIdAndUpdate(productId, {
        $set: { 'inventory.inStock': false },
      });
      return res.json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    if (
      orderQuantity &&
      availableQuantity &&
      orderQuantity > availableQuantity
    ) {
      return res.json({
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

export const OrderControllers = {
  createNewOrder,
};
