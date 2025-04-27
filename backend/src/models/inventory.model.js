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
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
