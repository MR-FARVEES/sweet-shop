import express from "express";
import inventoryController from "../controllers/inventory.controller.js";

const router = express.Router();

// Get all inventory items
router.get("/", inventoryController.getInventoryItems);

// Get inventory item by ID
router.get("/:id", inventoryController.getInventoryItemById);

// Update inventory quantity
router.patch("/:id/quantity", inventoryController.updateInventoryQuantity);

// Admin/Manager routes
router.post("/", inventoryController.createInventoryItem);
router.put("/:id", inventoryController.updateInventoryItem);
router.delete("/:id", inventoryController.deleteInventoryItem);

module.exports = router;
