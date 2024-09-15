import http from "./httpHandler.js";

const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message: message || http[statusCode].message,
    status: statusCode,
    ...(data && { data }),
  });
};

export default sendResponse;
