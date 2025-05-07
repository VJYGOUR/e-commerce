import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
// This code defines a Mongoose schema and model for a product in an e-commerce application. The schema includes fields for the product's name, description, price, image, category, and whether it is featured. The model is then exported for use in other parts of the application.
// The schema also includes timestamps to automatically track when the product was created and last updated.
