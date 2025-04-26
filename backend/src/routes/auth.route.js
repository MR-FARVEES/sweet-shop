import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

// @desc    Register a new user
router.post("/register", registerUser);

// @desc    Login a user
router.post("/login", loginUser);

export default router;
