import express from "express";
import { logout, login, signup } from "../controllers/auth.controllers.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
// This code defines an Express router for handling authentication routes.
//hello
