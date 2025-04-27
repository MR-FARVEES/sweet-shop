import express from "express";
import paymentController from "../controllers/payment.controller.js";

const router = express.Router();

// Get all payments
router.get("/", paymentController.getPayments);

// Get payment by ID
router.get("/:id", paymentController.getPaymentById);

// Get payments by invoice ID
router.get("/invoice/:invoiceId", paymentController.getPaymentsByInvoice);

// Get payments by customer ID
router.get("/customer/:customerId", paymentController.getPaymentsByCustomer);

// Create a new payment
router.post("/", paymentController.createPayment);

// Update a payment
router.put("/:id", paymentController.updatePayment);

// Delete a payment
router.delete("/:id", paymentController.deletePayment);
