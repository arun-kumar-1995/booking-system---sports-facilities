import User from "../models/user.models.js";
import CatchAsyncError from "../utils/catchAsyncError.utils.js";
import ErrorHandler from "../utils/errorHandler.js";
import getSignInToken from "../utils/getSignInToken.utils.js";
import sendResponse from "../utils/responseHandler.js";
import setCookie from "../utils/setCookie.utils.js";

export const signUp = CatchAsyncError(async (req, res, next) => {
  //find user by email or phone number
  let user = await User.findOne({
    $or: [{ email: req.body.email }, { phone: parseInt(req.body.phone) }],
  }).lean();

  if (user) return ErrorHandler(res, 409, "user already exists");

  // else create a new user
  user = await User.create(req.body);
  sendResponse(res, 201, "User registered");
}, true);

export const signIn = CatchAsyncError(async (req, res, next) => {
  // sign in using email and password or phone otp
  // find user
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user) return ErrorHandler(res, 404, "user not found");

  //match password
  const isMatch = await user.matchPassword(req.body.password);
  if (!isMatch) return ErrorHandler(res, 400, "Invalid email or password");

  // get token
  const token = getSignInToken(user._id);
  //create session cookie
  setCookie(res, user, token);
  // send response
  sendResponse(res, 200, "You are logged in", { token });
});


// get user profile

// update user profile
// get user details (admin only)
// DELETE /api/users/ (admin only)