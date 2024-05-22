import { Request, Response } from 'express';
import {
  productValidationSchema,
  updateProductValidationSchema,
} from './productValidation';
import { Product } from './product.interface';
import { productServices } from './product.service';

// Create Products
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

// Get all Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await productServices.getAllProductsFromDB(
      searchTerm as string,
    );
    if (result?.length === 0) {
      return res.json({
        success: false,
        message: 'Product not found',
      });
    }
    searchTerm
      ? res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        })
      : res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    updateProductValidationSchema.parse(updateData);

    const result = await productServices.updateProductIntoDB(
      productId,
      updateData,
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteProductFromDB(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
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
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
