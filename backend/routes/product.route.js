import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducuts,
  getProductByCategory,
  getRecommendedProducts,
} from "../controllers/product.controllers.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducuts);
router.get("category/:category", getProductByCategory);
router.get("/recommendations", getRecommendedProducts); // corrected function name
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
export default router;
