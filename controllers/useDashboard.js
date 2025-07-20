import DashboardModel from "../models/dashboard/Total_number_of_products.js";
import OrderPriceModel from "../models/dashboard/order_price.js";

export const getTotalNumberOfProducts = async (req, res, next) => {
  try {
    const data = await DashboardModel.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getOrderPrices = async (req, res, next) => {
  try {
    const data = await OrderPriceModel.findOne();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
