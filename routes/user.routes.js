import express from "express";
const router = express.Router();

// import controller
import { signUp , signIn} from "../controllers/user.controllers.js";

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);

export default router;
