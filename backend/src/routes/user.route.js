import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

//Get user profile
router.get("/profile", userController.getUserProfile);

//Update user profile
router.put("/profile", userController.updateUserProfile);

export default router;
