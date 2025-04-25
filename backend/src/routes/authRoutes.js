import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

// @desc    Register a new user
router.post("/register", async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    password,
    email,
    address,
    contact,
    bussinessName,
  } = req.body;
  try {
    if (
      !username ||
      !firstname ||
      !lastname ||
      !password ||
      !email ||
      !address ||
      !contact ||
      !bussinessName
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return res
        .status(400)
        .json({ error: "Username can only contain letters and numbers" });
    }
    if (!/^[a-zA-Z0-9]+$/.test(firstname)) {
      return res
        .status(400)
        .json({ error: "Firstname can only contain letters and numbers" });
    }
    if (!/^[a-zA-Z0-9]+$/.test(lastname)) {
      return res
        .status(400)
        .json({ error: "Lastname can only contain letters and numbers" });
    }

    //check if user already exists
    const existingEmai = await User.findOne({ email });
    if (existingEmai) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({
      username,
      firstname,
      lastname,
      password,
      email,
      address,
      contact,
      bussinessName,
    });

    await newUser.save();

    // Generate a token for the user
    const token = generateToken(newUser._id);

    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        address: newUser.address,
        contact: newUser.contact,
        bussinessName: newUser.bussinessName,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// @desc    Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a token for the user
    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        contact: user.contact,
        bussinessName: user.bussinessName,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
