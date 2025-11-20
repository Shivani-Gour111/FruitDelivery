import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  // Admin profile
  adminName: { type: String, default: "Admin" },
  adminEmail: { type: String, default: "admin@domain.com" },
  profileImage: { type: String, default: "" },

  // Delivery
  deliveryCharges: { type: Number, default: 30 },
  freeDeliveryAbove: { type: Number, default: 500 },
  deliveryAreas: [{ type: String }], // list of pin codes / areas
  deliveryTimeSlots: [{ type: String }],

// Payment
  paymentMethods: {
    cashOnDelivery: { type: Boolean, default: true },
    razorpay: {
      enabled: { type: Boolean, default: false },
      keyId: { type: String, default: "" },
      keySecret: { type: String, default: "" }
    },
    stripe: {
      enabled: { type: Boolean, default: false },
      pk: { type: String, default: "" },
      sk: { type: String, default: "" }
    },
    upi: { type: Boolean, default: false }
  },

  // Order settings
  autoCancelMins: { type: Number, default: 30 },
  minOrderValue: { type: Number, default: 50 },
  maxQuantityPerOrder: { type: Number, default: 20 },

  // Notifications
  notifications: {
    emailOnNewOrder: { type: Boolean, default: true },
    smsOnNewOrder: { type: Boolean, default: false },
    lowStockAlert: { type: Boolean, default: true }
  },

  // Appearance
  theme: {
    darkMode: { type: Boolean, default: false },
    primaryColor: { type: String, default: "#008080" }
  },

  // Legal & info
  aboutText: { type: String, default: "" },
  privacyPolicy: { type: String, default: "" },
  terms: { type: String, default: "" },

}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);
