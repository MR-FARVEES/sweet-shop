import express from "express";
import { Router } from "express";
import categoryController from "../controllers/category.controller";

const router = express.Router();

// Get all categories
router.get("/", categoryController.getCategories);

// Get category by ID
router.get("/:id", categoryController.getCategoryById);

router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
