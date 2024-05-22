import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createNewProductIntoDB = async (newProduct: Product) => {
  //Check if product alreay exists or not
  if (await ProductModel.isProductExists(newProduct.name)) {
    throw new Error('Product already exists!');
  }

  const result = await ProductModel.create(newProduct);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string) => {
  let query = {};
  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }

  const result = searchTerm
    ? await ProductModel.find(query)
    : await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

const updateProductIntoDB = async (updateId: string, updateProduct: object) => {
  const result = await ProductModel.findByIdAndUpdate(updateId, updateProduct, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};

export const productServices = {
  createNewProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
