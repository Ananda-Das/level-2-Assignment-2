import { Request, Response } from 'express';
import { productValidationSchema } from './productValidation';
import { Product } from './product.interface';
import { productServices } from './product.service';

const createNewProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = req.body;

    productValidationSchema.parse(newProduct);

    const result = await productServices.createNewProductIntoDB(newProduct);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const ProductControllers = {
  createNewProduct,
};
