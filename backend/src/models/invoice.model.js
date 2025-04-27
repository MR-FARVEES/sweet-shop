import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Cancelled", "partially_paid"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Generate invoice number before saving
invoiceSchema.pre("save", async function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const latestInvoice = await this.constructor.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );

    let counter = 1;
    if (latestInvoice && latestInvoice.invoiceNumber) {
      const lastCounter = parseInt(latestInvoice.invoiceNumber.slice(-4));
      if (!isNaN(lastCounter)) {
        counter = lastCounter + 1;
      }
    }

    this.invoiceNumber = `INV-${year}${month}${day}-${counter
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
