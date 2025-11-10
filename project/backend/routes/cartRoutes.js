import express from "express";
// import Cart from "../models/Cart.js"; // we'll create this model next

const router = express.Router();

// ➕ Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;

    let existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.json({ success: true, message: "Quantity updated", cart: existingItem });
    }

    const newItem = new Cart({ productId, name, price, image, quantity: 1 });
    await newItem.save();
    res.json({ success: true, message: "Item added to cart", cart: newItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🛒 Get all cart items
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ❌ Remove item from cart
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
