import express from "express";
import inventoryController from "../controllers/inventory.controller.js";

const router = express.Router();

// Get all inventory items
router.get("/", inventoryController.getInventory);

// Get inventory item by ID
router.get("/:id", inventoryController.getInventoryById);

// Update inventory quantity
router.patch("/:id/quantity", inventoryController.updateInventoryQuantity);

router.post("/", inventoryController.createInventory);
router.put("/:id", inventoryController.updateInventoryItem);
router.delete("/:id", inventoryController.deleteInventoryItem);

export default router;
