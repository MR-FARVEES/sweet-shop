import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const invoiceSchema = new mongoose.Schema({
  iid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      inventoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
