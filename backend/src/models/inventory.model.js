import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const inventorySchema = new mongoose.Schema(
  {
    iid: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
