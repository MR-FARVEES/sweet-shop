import express from "express";
import orderController from "../controllers/order.controller.js";

const router = express.Router();

// Get order statistics
router.get("/stats", orderController.getOrderStats);

// Get all orders
router.get("/", orderController.getAllOrders);

// Get order by ID
router.get("/:id", orderController.getOrderById);

// Get orders by customer
router.get("/customer/:customerId", orderController.getOrdersByCustomer);

// Create order
router.post("/", orderController.createOrder);

// Update order status
router.patch("/:id/status", orderController.updateOrderStatus);

// Cancel order
router.patch("/:id/cancel", orderController.cancelOrder);

export default router;
