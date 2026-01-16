const { errorResponse } = require("../utils/responseHandler");

const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong on the server";

  return errorResponse(res, message, statusCode, err);
};

module.exports = errorHandler;
