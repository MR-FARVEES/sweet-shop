import Payment from "../models/payment.model.js";
import Invoice from "../models/invoice.model.js";

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { invoice, customer, amount, paymentMethod, paymentDate } = req.body;

    // If invoice is provided, check if it exists and update its status
    if (invoice) {
      const invoiceData = await Invoice.findById(invoice);
      if (!invoiceData) {
        return res.status(404).json({ message: "Invoice not found" });
      }

      // Create payment
      const payment = await Payment.create({
        invoice,
        customer: customer || invoiceData.customer,
        amount,
        paymentMethod,
        paymentDate: paymentDate || Date.now(),
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
    } else {
      // Create payment without invoice
      const payment = await Payment.create({
        customer,
        amount,
        paymentMethod,
        paymentDate: paymentDate || Date.now(),
      });

      res.status(201).json(payment);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments
export const getPayments = async (req, res) => {
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
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("invoice", "invoiceNumber totalAmount")
      .populate("customer", "name phone");

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
export const getPaymentsByInvoice = async (req, res) => {
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
export const getPaymentsByCustomer = async (req, res) => {
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
export const updatePayment = async (req, res) => {
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
export const deletePayment = async (req, res) => {
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
