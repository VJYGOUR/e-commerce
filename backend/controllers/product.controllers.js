import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getFeaturedProducuts = async (req, res) => {
  try {
    let featuredProducts = await client.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }
    featuredProducts = await Product.find({ isFeatured: true }.lean());
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }
    await client.set("featured_products", JSON.stringify(featuredProducts), {
      EX: 60 * 60 * 24,
    });
    return res.json(featuredProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createProduct = async (req, res) => {
  const { name, description, price, image, category, isFeatured } = req.body;
  let cloudinaryResponse = null;
  if (image) {
    cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
  }
  try {
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
      category,
      isFeatured,
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
