import Invoice from "../models/invoice.model.js";
import Order from "../models/order.model.js";

const createInvoice = async (req, res) => {
  try {
    const { order } = req.body;

    // Check if order exists
    const orderData = await Order.findById(order);
    if (!orderData) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if invoice already exists for this order
    const invoiceExists = await Invoice.findOne({ order });
    if (invoiceExists) {
      return res
        .status(400)
        .json({ message: "Invoice already exists for this order" });
    }

    // Generate invoice number
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const latestInvoice = await Invoice.findOne(
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

    // INV-250427-0001
    const invoiceNumber = `INV-${year}${month}${day}-${counter
      .toString()
      .padStart(4, "0")}`;

    // Create invoice
    const invoice = await Invoice.create({
      invoiceNumber,
      customer: orderData.customer,
      order,
      totalAmount: orderData.totalAmount,
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer", "name")
      .populate("order", "orderNumber")
      .sort({ date: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id)
      .populate("customer", "name storeName address phone")
      .populate({
        path: "order",
        populate: {
          path: "items.item",
          select: "name price",
        },
      });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update invoice status
const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
      invoice.status = status;

      const updatedInvoice = await invoice.save();
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get invoice by customer id
const getInvoicesByCustomer = async (req, res) => {
  try {
    const invoices = await Invoice.find({ customer: req.params.customerId })
      .populate("order", "orderNumber")
      .sort("-createdAt");

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  getInvoicesByCustomer,
};
