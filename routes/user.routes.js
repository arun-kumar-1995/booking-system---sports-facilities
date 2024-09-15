import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("route hits");
  return res.status(200).json({
    success: true,
    message: "Testing user route",
  });
});

export default router;
