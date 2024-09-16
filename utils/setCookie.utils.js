import getSignInToken from "./getSignInToken.js";

const setCookie = (res, user) => {
  const token = getSignInToken(user._id);
  // calculate expires in milliseconds
  const expiresIn = Date.now() + process.env.COOKIE_EXPIRE * 86400000;

  const cookie_options = {
    expires: new Date(expiresIn),
    httpOnly: true, // Prevent access from client-side JS
    secure: process.env.NODE_ENV === "production",
  };

  // setting up cookie
  res.cookie(
    "_session",
    JSON.stringify({
      token,
      user: { id: user._id, role: user.role },
    }),
    cookie_options
  );
};

export default setCookie;
