import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string({ message: 'Email is required*' }),
  productId: z.string({ message: 'ProductId is required*' }),
  price: z.number({ message: 'Price is required*' }),
  quantity: z.number({ message: 'Quantity is required*' }),
});
