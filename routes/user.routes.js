import express from "express";
const router = express.Router();

router.route("/sign-up").post(signUp);
export default router;
