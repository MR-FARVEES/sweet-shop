import Payment from "../models/payment.model.js";
import Invoice from "../models/invoice.model.js";

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { invoice, amount, paymentMethod } = req.body;

    const invoiceData = await Invoice.findById(invoice);
    if (!invoiceData) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Generate payment number
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const latestPayment = await Payment.findOne(
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
    const paymentNumber = `PAY-${year}${month}${day}-${counter
      .toString()
      .padStart(4, "0")}`;

    // Create payment
    const payment = await Payment.create({
      paymentNumber,
      invoice,
      customer: invoiceData.customer,
      amount,
      paymentMethod,
      paymentDate: Date.now(),
    });

    // Update invoice status based on payment
    const totalPaid = await Payment.aggregate([
      { $match: { invoice: invoiceData._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalPaidAmount = totalPaid.length > 0 ? totalPaid[0].total : 0;

    if (totalPaidAmount >= invoiceData.finalAmount) {
      invoiceData.status = "paid";
    } else if (totalPaidAmount > 0) {
      invoiceData.status = "partially_paid";
    }

    await invoiceData.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate("invoice", "invoiceNumber")
      .populate("customer", "name")
      .sort("-paymentDate");

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("invoice", "invoiceNumber totalAmount")
      .populate("customer", "name phone storeName");

    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payments by invoice ID
const getPaymentsByInvoice = async (req, res) => {
  try {
    const payments = await Payment.find({ invoice: req.params.invoiceId }).sort(
      "-paymentDate"
    );

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get payments by customer ID
const getPaymentsByCustomer = async (req, res) => {
  try {
    const payments = await Payment.find({ customer: req.params.customerId })
      .populate("invoice", "invoiceNumber")
      .sort("-paymentDate");

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment by ID
const updatePayment = async (req, res) => {
  try {
    const { amount, paymentMethod, paymentDate } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (payment) {
      const oldAmount = payment.amount;

      payment.amount = amount !== undefined ? amount : payment.amount;
      payment.paymentMethod = paymentMethod || payment.paymentMethod;
      payment.paymentDate = paymentDate || payment.paymentDate;

      const updatedPayment = await payment.save();

      // If payment is associated with an invoice, update invoice status
      if (payment.invoice) {
        const invoice = await Invoice.findById(payment.invoice);

        if (invoice) {
          const totalPaid = await Payment.aggregate([
            { $match: { invoice: invoice._id } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
          ]);

          const totalPaidAmount = totalPaid.length > 0 ? totalPaid[0].total : 0;

          if (totalPaidAmount >= invoice.finalAmount) {
            invoice.status = "paid";
          } else if (totalPaidAmount > 0) {
            invoice.status = "partially_paid";
          } else {
            invoice.status = "pending";
          }

          await invoice.save();
        }
      }

      res.json(updatedPayment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete payment by ID
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (payment) {
      await payment.remove();

      // If payment is associated with an invoice, update invoice status
      if (payment.invoice) {
        const invoice = await Invoice.findById(payment.invoice);

        if (invoice) {
          const totalPaid = await Payment.aggregate([
            { $match: { invoice: invoice._id } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
          ]);

          const totalPaidAmount = totalPaid.length > 0 ? totalPaid[0].total : 0;

          if (totalPaidAmount >= invoice.finalAmount) {
            invoice.status = "paid";
          } else if (totalPaidAmount > 0) {
            invoice.status = "partially_paid";
          } else {
            invoice.status = "pending";
          }

          await invoice.save();
        }
      }

      res.json({ message: "Payment removed" });
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentsByInvoice,
  getPaymentsByCustomer,
  updatePayment,
  deletePayment,
};
