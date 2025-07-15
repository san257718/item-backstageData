import { Schema, model } from "mongoose";
export const dashboardSchema = new Schema({
  Total_number_of_products: {
    type: Number,
    required: true,
  },
  edited_today: {
    type: Number,
    required: true,
  },
  active_users: {
    type: Number,
    required: true,
  },
  pending_orders: {
    type: Number,
    required: true,
  },
});

export default model("total_number_of_products", dashboardSchema);
