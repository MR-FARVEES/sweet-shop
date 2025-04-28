import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const customerSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
