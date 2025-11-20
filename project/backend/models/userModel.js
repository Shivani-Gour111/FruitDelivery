import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "user" }, // ✅ add this line
  address: { type: String, default: "" },
  avatarUrl: { type: String, default: null },
});

const User = mongoose.model("User", userSchema);
export default User;
