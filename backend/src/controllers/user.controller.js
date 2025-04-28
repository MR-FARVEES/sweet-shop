import User from "../models/user.model.js";

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, address, contact, bussinessName } =
    req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, email, address, contact, bussinessName },
      { new: true }
    ).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getUserProfile,
  updateUserProfile,
};
