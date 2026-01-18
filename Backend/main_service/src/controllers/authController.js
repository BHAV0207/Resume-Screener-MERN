const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { sendMessage } = require("../kafka/producer");
const { TOPICS } = require("../kafka/topics");

const register = async (req, res, next) => {
  try {
    const { name, email, password, type } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, "Please provide all required fields", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User already exists", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      type: type || "user",
    });

    await newUser.save();

    sendMessage(TOPICS.USER_REGISTERED, {
      userType: type,
      userId: newUser.id,
      email: email,
      name: name,
    }).catch((err) => {
      console.error("Kafka produce failed", err);
    });

    return successResponse(res, "User registered successfully", {}, 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Please provide email and password", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return successResponse(res, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
