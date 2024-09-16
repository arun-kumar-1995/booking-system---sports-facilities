const setCookie = (res, user, token) => {
  // calculate expires in milliseconds
  const expiresIn = Date.now() + process.env.COOKIE_EXPIRE * 86400000;

  const cookie_options = {
    expires: new Date(expiresIn),
    httpOnly: true, // Prevent access from client-side JS
    secure: process.env.NODE_ENV === "production",
  };

  // setting up cookie
  res.cookie("_session", { token }, cookie_options);
};

export default setCookie;
