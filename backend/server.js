import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"; // import the authRoutes from the auth.route.js file
import productRoutes from "./routes/product.route.js"; // import the productRoutes from the product.route.js file
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import cors from "cors";
import { connect } from "mongoose";
import { connectDB } from "./lib/db.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // this middleware execute for every request and you write it only once thats it , no need to write again and again for every sebsequent request.
app.use(
  cors({
    origin: "http://localhost:5173", // Your Vite dev server
    credentials: true,
  })
);
app.use(cookieParser()); // this middleware is used to parse the cookies from the request
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); // add this line to use the cart routes
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(); // call the connectDB function to connect to the database
});
