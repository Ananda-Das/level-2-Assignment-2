import { Model } from 'mongoose';

export type variants = {
  type: string;
  value: string;
};

export type inventory = {
  quantity: number;
  inStock: boolean;
};

export type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: variants[];
  inventory: inventory;
};

// Static method
export interface ProductInterfaceModel extends Model<Product> {
  isProductExists(name: string): Promise<Product>;
}
