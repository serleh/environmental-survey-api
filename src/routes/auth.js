import express from "express";
import { register, loginController } from "../controllers/auth.js";
import { validateRegistration } from "../middlewares/validateRegistration.js";

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", loginController);

export default router;
