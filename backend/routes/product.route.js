import express from "express";
import {
  createProduct,
  getAllProducts,
  getFeaturedProducuts,
} from "../controllers/product.controllers.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducuts);
router.post("/", protectRoute, adminRoute, createProduct);
export default router;
