import express from "express";
const router = express.Router();

// import controller
import { signUp } from "../controllers/user.controllers.js";

router.route("/sign-up").post(signUp);
export default router;
