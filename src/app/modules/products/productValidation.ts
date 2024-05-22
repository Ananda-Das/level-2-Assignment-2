import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const inventoryValidation = z.object({
  quantity: z.number({ message: 'Quantity is mandatory!' }),
  inStock: z.boolean(),
});

export const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number({ message: 'Price is required!' }),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidation,
});

//define a partial schema for update a product where all fields are optional
export const updateProductValidationSchema = productValidationSchema.partial();
