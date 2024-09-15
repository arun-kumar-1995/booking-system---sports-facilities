import User from "../models/user.models";

export const signUp = async (req, res, next) => {
  const { email, phone } = req.body;
  console.log(email, phone);
  try {
    //find user by email or phone number
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.email }],
    });
    if (user)
      return res.status(200).json({
        success: true,
        message: "user already exists",
      });

    // else create a new user
    await User.create(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered",
    });
  } catch (err) {
    next(err);
  }
};
