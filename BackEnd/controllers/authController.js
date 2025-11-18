const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validation: Check for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      id: user._id,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation: Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      id: user._id,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
  try {
    // req.user should be set by auth middleware
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user info", error: err.message });
  }
};
