import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import ErrorHandler from "../utils/errorHandler.js";
import getTokenFromRequest from "../utils/getTokenFromrequest.utils.js";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token)
      return ErrorHandler(res, 401, "You are not authorized, token is missing");

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // find user
    const user = await User.findById(decoded.id).lean();
    if (!user)
      return ErrorHandler(res, 404, "User does not exist , Invalid token");

    // Attach the decoded token (user id) to req.user
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default isAuthenticated;
