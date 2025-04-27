import express from "express";
import invoiceController from "../controllers/invoice.controller.js";

const router = express.Router();

// Get overdue invoices
router.get("/overdue", invoiceController.getOverdueInvoices);

// Get all invoices
router.get("/", invoiceController.getInvoices);

// Get invoice by ID
router.get("/:id", invoiceController.getInvoiceById);

// Get invoices by customer
router.get("/customer/:customerId", invoiceController.getInvoicesByCustomer);

// Create invoice
router.post("/", invoiceController.createInvoice);

// Update invoice
router.put("/:id", invoiceController.updateInvoice);

// Update invoice status
router.patch("/:id/status", invoiceController.updateInvoiceStatus);

module.exports = router;
