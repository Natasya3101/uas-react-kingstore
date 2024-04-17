import express from "express";
import { login, logout } from "../controllers/auth-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/auth/login", login);
router.get("/auth/logout",verifyToken, logout);

export default router;