import express from "express";
const app = express();
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"; // import the authRoutes from the auth.route.js file
import { connect } from "mongoose";
import { connectDB } from "./lib/db.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // this middleware execute for every request and you write it only once thats it , no need to write again and again for every sebsequent request.
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(); // call the connectDB function to connect to the database
});
