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
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicId = product.image.split("/").pop().split("."[0]); //this will get the public id from the url}
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updatedFeaturedProductsCache();
      return res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updatedFeaturedProductsCache = async () => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await client.set("featured_products", JSON.stringify(featuredProducts), {
      EX: 60 * 60 * 24,
    });
  } catch (error) {
    console.error("Error updating featured products cache:", error);
  }
};
