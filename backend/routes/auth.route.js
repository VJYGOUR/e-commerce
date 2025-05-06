import express from "express";
import {
  logout,
  login,
  signup,
  refreshToken,
} from "../controllers/auth.controllers.js";
import { get } from "mongoose";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
// router.get("/profile", getProfile);

export default router;
// This code defines an Express router for handling authentication routes.
//hello
//
