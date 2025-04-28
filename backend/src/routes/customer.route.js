import express from "express";
import customerController from "../controllers/customer.controller.js";

const router = express.Router();

// Get all customers
router.get("/", customerController.getCustomers);

// Get customer by ID
router.get("/:id", customerController.getCustomerById);

// Create customer
router.post("/", customerController.createCustomer);

// Update customer
router.put("/:id", customerController.updateCustomer);

// Delete customer
router.delete("/:id", customerController.deleteCustomer);

export default router;
