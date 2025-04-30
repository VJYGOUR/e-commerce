import express from "express";
import { logout, login, signup } from "../controllers/auth.controllers";
const router = express.Router();
router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);
export default router;
// This code defines an Express router for handling authentication routes.
