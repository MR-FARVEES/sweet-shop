import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const paymentSchema = new mongoose.Schema({
  pid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ["Cash", "Card", "Cheque"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Cleared"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
