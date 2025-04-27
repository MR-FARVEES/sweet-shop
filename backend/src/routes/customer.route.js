import express from "express";
import customerController from "../controllers/customer.controller.js";

const router = express.Router();

// Get all customers
router.get("/", customerController.getCustomers);

// Search customers
router.get("/search", customerController.searchCustomers);

// Get customer by ID
router.get("/:id", customerController.getCustomerById);

// Create customer
router.post("/", customerController.createCustomer);

// Update customer
router.put("/:id", customerController.updateCustomer);

// Update customer purchases
router.patch("/:id/purchases", customerController.updateCustomerPurchases);

// Delete customer (admin only)
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
