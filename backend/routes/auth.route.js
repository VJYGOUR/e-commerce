import express from "express";
import {
  logout,
  login,
  signup,
  refreshToken,
  getProfile,
} from "../controllers/auth.controllers.js";
import { get } from "mongoose";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

export default router;
// This code defines an Express router for handling authentication routes.
//hello
//
