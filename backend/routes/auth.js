require('dotenv').config();
const express = require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const router = express.Router();

const userProfileSchema = require('../models/Schemas/userProfile');
const ngoProfileSchema = require('../models/Schemas/ngoProfile');
const User = require('../models/Usermodel')
router.post('/signup', async (req, res) => {
  try {
    const { username:rawusername, password, role, email } = req.body;

    if (!rawusername || !password || !email|| !role) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    var username = rawusername.trim();

    const existingUser = await User.findOne({
  $or: [{ email }, { username }]
});

if (existingUser) {
  return res.status(409).json({
    success: false,
    message: "Email or username already exists",
  });
}


    const hashedPassword = await bcrypt.hash(password, 10);

    const userdata = new User({
      username,
      password: hashedPassword,
      role,
      email,
    });

    // Initialize profile based on role
    if (role === 'user') {
      userdata.userProfile = {}; // ✅ Triggers default values in userProfileSchema
    }

    if (role === 'ngo') {
      userdata.ngoProfile = {}; // ✅ Triggers default values in ngoProfileSchema
    }

    const newUser = new User(userdata);

    await newUser.save();
    
    // Generate token for the new user
    const token = jwt.sign(
      { username: userdata.username, role: userdata.role, userId: userdata._id },
      process.env.Secret
      
    );

    // Return success with token (auto-login)
    return res.status(201).json({
      success: true,
      message: "User successfully created",
      token: token
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role, userId: user._id },
      process.env.Secret // optional expiry
    );

    // Successful login response
    return res.status(200).json({ success: true,message: "login successfull",token:token});

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;
