const http = {
  200: {
    statusCode: 200,
    message: "OK",
  },
  201: {
    statusCode: 201,
    message: "Resource created",
  },
  400: {
    statusCode: 400,
    message: "Bad Request",
  },
  401: {
    statusCode: 401,
    message: "You are unauthorized!",
  },
  403: {
    statusCode: 403,
    message: "You can't access this resource",
  },
  404: {
    statusCode: 404,
    message: "Resource not found",
  },
  409: {
    statusCode: 409,
    message: "Resource conflict",
  },
  500: {
    statusCode: 500,
    message: "Internal Server Error",
  },
};

export default http;
