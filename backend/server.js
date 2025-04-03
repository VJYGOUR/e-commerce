import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Server is ready");
});
dotenv.config();
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
