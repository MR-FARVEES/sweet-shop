import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Cheque"],
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Generate payment number before saving
paymentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const latestPayment = await this.constructor.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );

    let counter = 1;
    if (latestPayment && latestPayment.paymentNumber) {
      const lastCounter = parseInt(latestPayment.paymentNumber.slice(-4));
      if (!isNaN(lastCounter)) {
        counter = lastCounter + 1;
      }
    }

    // Payment number format: PAY-YYMMDD-XXXX
    this.paymentNumber = `PAY-${year}${month}${day}-${counter
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
