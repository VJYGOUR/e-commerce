import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password must be at least 6 character long"],
  },
  cartItems: [
    {
      quantity: { type: Number, default: 1 },
    },
  ],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "customer",
  },

  timestamp: true,
});
// MODEL
const User = mongoose.models("User", userSchema);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export default User;
