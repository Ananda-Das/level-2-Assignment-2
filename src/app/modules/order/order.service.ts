import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createNewOrderIntoDB = async (newOrder: Order) => {
  const result = await OrderModel.create(newOrder);
  return result;
};

const getAllOrdersFromDB = async (email: string) => {
  const result = await OrderModel.find(email ? { email } : {});
  return result;
};

export const orderServices = {
  createNewOrderIntoDB,
  getAllOrdersFromDB,
};
