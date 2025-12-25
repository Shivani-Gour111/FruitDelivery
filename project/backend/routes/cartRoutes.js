import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Load user cart
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error loading cart" });
  }
});

// Add to cart
router.post("/add", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    const { userId, productId, name, price, image } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existing = cart.items.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({ productId, name, price, image, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
});

router.put("/increase/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(i => i.productId === productId);
    item.quantity += 1;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error increasing quantity" });
  }
});

// Decrease qty
router.put("/decrease/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(i => i.productId === productId);

    if (item.quantity > 1) item.quantity -= 1;
    else cart.items = cart.items.filter(i => i.productId !== productId);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error decreasing quantity" });
  }
});

// Delete item
router.delete("/delete/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    cart.items = cart.items.filter(item => item.productId !== productId);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});

export default router;
