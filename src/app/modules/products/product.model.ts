import { Schema, model } from 'mongoose';
import {
  Product,
  ProductInterfaceModel,
  inventory,
  variants,
} from './product.interface';

const variantSchema = new Schema<variants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const invetorySchema = new Schema<inventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new Schema<Product, ProductInterfaceModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    variants: [variantSchema],
    inventory: {
      type: invetorySchema,
      required: true,
    },
  },
  { versionKey: false },
);

//create a static method
productSchema.static('isProductExists', async function (name: string) {
  const isExistsProduct = await ProductModel.findOne({ name });
  return isExistsProduct;
});

export const ProductModel = model<Product, ProductInterfaceModel>(
  'Product',
  productSchema,
);
