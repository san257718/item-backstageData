import { Schema, model } from "mongoose";
export const orderPriceSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  order_price: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default model("OrderPrice", orderPriceSchema);
