import express from "express";
import Like from "../models/likeModel.js";

const router = express.Router();

// ✅ Like product
router.post("/", async (req, res) => {
  const { userId, productId } = req.body;
  

  if (!userId) return res.status(400).json({ message: "userId is required" });

  const exist = await Like.findOne({ userId, productId });
  if (exist) return res.status(400).json({ message: "Already liked" });

  const like = new Like({ userId, productId });
  await like.save();
  res.status(200).json({ message: "Liked successfully" });
});

// ✅ Unlike product
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  await Like.findOneAndDelete({ userId, productId });
  res.json({ message: "Unliked successfully" });
});

// ✅ Get all liked products for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const likes = await Like.find({ userId }).populate("productId");
  res.json(likes);
});

export default router;
