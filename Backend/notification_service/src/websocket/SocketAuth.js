const jwt = require("jsonwebtoken");

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = {
      id: decoded.userId,
      email: decoded.email || null,
      role: decoded.role || decoded.type || "user",
      claims: decoded, // FULL JWT PAYLOAD (future-proof)
    };

    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
};

module.exports = socketAuth;
