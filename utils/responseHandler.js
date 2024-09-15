const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    status: statusCode,
    success: statusCode >= 200 && statusCode < 300,
    message,
    ...(data && { data }),
  });
};

export default sendResponse;
