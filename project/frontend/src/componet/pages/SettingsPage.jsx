import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [profile, setProfile] = useState({ adminName: "", adminEmail: "" });
  const [appearance, setAppearance] = useState({ darkMode: false, primaryColor: "#008080" });

  // delivery/payment/order forms state (simple)
  const [delivery, setDelivery] = useState({
    deliveryCharges: 0,
    freeDeliveryAbove: 0,
    deliveryAreas: "",
    deliveryTimeSlots: ""
  });

  const [payment, setPayment] = useState({
    cashOnDelivery: true,
    razorpayEnabled: false,
    razorpayKeyId: "",
    razorpayKeySecret: ""
  });

  const [order, setOrder] = useState({
    autoCancelMins: 30,
    minOrderValue: 50,
    maxQuantityPerOrder: 20
  });

  const [notifications, setNotifications] = useState({
    emailOnNewOrder: true,
    smsOnNewOrder: false,
    lowStockAlert: true
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/settings");
      if (res.data.settings) {
        const s = res.data.settings;
        setSettings(s);
        setProfile({ adminName: s.adminName || "", adminEmail: s.adminEmail || "" });
        setAppearance({ darkMode: s.theme?.darkMode || false, primaryColor: s.theme?.primaryColor || "#008080" });
        setDelivery({
          deliveryCharges: s.deliveryCharges || 0,
          freeDeliveryAbove: s.freeDeliveryAbove || 0,
          deliveryAreas: (s.deliveryAreas || []).join(", "),
          deliveryTimeSlots: (s.deliveryTimeSlots || []).join(", ")
        });
        setPayment({
          cashOnDelivery: s.paymentMethods?.cashOnDelivery ?? true,
          razorpayEnabled: s.paymentMethods?.razorpay?.enabled ?? false,
          razorpayKeyId: s.paymentMethods?.razorpay?.keyId || "",
          razorpayKeySecret: s.paymentMethods?.razorpay?.keySecret || ""
        });
        setOrder({
          autoCancelMins: s.autoCancelMins || 30,
          minOrderValue: s.minOrderValue || 50,
          maxQuantityPerOrder: s.maxQuantityPerOrder || 20
        });
        setNotifications({
          emailOnNewOrder: s.notifications?.emailOnNewOrder ?? true,
          smsOnNewOrder: s.notifications?.smsOnNewOrder ?? false,
          lowStockAlert: s.notifications?.lowStockAlert ?? true
        });
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load settings");
      setLoading(false);
    }
  };

  const saveSettings = async (payload) => {
    try {
      await axios.put("http://localhost:5000/api/settings", payload);
      toast.success("Settings saved");
      loadSettings();
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  const onSaveProfile = async (e) => {
    e.preventDefault();
    await saveSettings({ adminName: profile.adminName, adminEmail: profile.adminEmail });
  };

  const onSaveDelivery = async (e) => {
    e.preventDefault();
    const payload = {
      deliveryCharges: Number(delivery.deliveryCharges),
      freeDeliveryAbove: Number(delivery.freeDeliveryAbove),
      deliveryAreas: delivery.deliveryAreas.split(",").map(s => s.trim()).filter(Boolean),
      deliveryTimeSlots: delivery.deliveryTimeSlots.split(",").map(s => s.trim()).filter(Boolean)
    };
    await saveSettings(payload);
  };

  const onSavePayment = async (e) => {
    e.preventDefault();
    const payload = {
      paymentMethods: {
        cashOnDelivery: payment.cashOnDelivery,
        razorpay: {
          enabled: payment.razorpayEnabled,
          keyId: payment.razorpayKeyId,
          keySecret: payment.razorpayKeySecret
        }
      }
    };
    await saveSettings(payload);
  };

  const onSaveOrder = async (e) => {
    e.preventDefault();
    await saveSettings({
      autoCancelMins: Number(order.autoCancelMins),
      minOrderValue: Number(order.minOrderValue),
      maxQuantityPerOrder: Number(order.maxQuantityPerOrder)
    });
  };

  const onSaveNotifications = async (e) => {
    e.preventDefault();
    await saveSettings({ notifications });
  };

  const onSaveAppearance = async (e) => {
    e.preventDefault();
    await saveSettings({ theme: { darkMode: appearance.darkMode, primaryColor: appearance.primaryColor } });
  };

  const exportUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/settings/export/users", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users_export.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.success("Export started");
    } catch (err) {
      console.error(err);
      toast.error("Export failed");
    }
  };

  const dangerClearUsers = async () => {
    if (!window.confirm("Are you sure? This will DELETE all non-admin users. Type YES to confirm.")) return;
    // extra confirm
    const c = prompt("Type YES to confirm deletion");
    if (c !== "YES") return;
    try {
      await axios.post("http://localhost:5000/api/settings/danger/clear-users");
      toast.success("Non-admin users removed");
      loadSettings();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  const dangerClearOrders = async () => {
    if (!window.confirm("Delete ALL orders? This is irreversible.")) return;
    try {
      await axios.post("http://localhost:5000/api/settings/danger/clear-orders");
      toast.success("All orders removed");
      loadSettings();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      {/* Profile */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Admin Profile</h3>
        <form onSubmit={onSaveProfile} className="space-y-2">
          <input value={profile.adminName} name="adminName" onChange={e => setProfile({...profile, adminName: e.target.value})} className="w-full p-2 border rounded" placeholder="Admin name" />
          <input value={profile.adminEmail} name="adminEmail" onChange={e => setProfile({...profile, adminEmail: e.target.value})} className="w-full p-2 border rounded" placeholder="Admin email" />
          <button className="px-4 py-2 bg-[#008080] text-white rounded">Save Profile</button>
        </form>
      </section>

      {/* Delivery */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Delivery Settings</h3>
        <form onSubmit={onSaveDelivery} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input value={delivery.deliveryCharges} onChange={e => setDelivery({...delivery, deliveryCharges: e.target.value})} className="p-2 border rounded" placeholder="Delivery charges" />
            <input value={delivery.freeDeliveryAbove} onChange={e => setDelivery({...delivery, freeDeliveryAbove: e.target.value})} className="p-2 border rounded" placeholder="Free delivery above" />
            <input value={delivery.deliveryAreas} onChange={e => setDelivery({...delivery, deliveryAreas: e.target.value})} className="p-2 border rounded" placeholder="Areas (comma separated)" />
          </div>
          <input value={delivery.deliveryTimeSlots} onChange={e => setDelivery({...delivery, deliveryTimeSlots: e.target.value})} className="w-full p-2 border rounded" placeholder="Time slots (comma separated)" />
          <button className="px-4 py-2 bg-[#008080] text-white rounded">Save Delivery</button>
        </form>
      </section>

      {/* Payment */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Payment Settings</h3>
        <form onSubmit={onSavePayment} className="space-y-2">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1"><input type="checkbox" checked={payment.cashOnDelivery} onChange={e => setPayment({...payment, cashOnDelivery: e.target.checked})} /> Cash on Delivery</label>
            <label className="flex items-center gap-1"><input type="checkbox" checked={payment.razorpayEnabled} onChange={e => setPayment({...payment, razorpayEnabled: e.target.checked})} /> Razorpay</label>
          </div>
          {payment.razorpayEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input placeholder="Key ID" value={payment.razorpayKeyId} onChange={e => setPayment({...payment, razorpayKeyId: e.target.value})} className="p-2 border rounded" />
              <input placeholder="Key Secret" value={payment.razorpayKeySecret} onChange={e => setPayment({...payment, razorpayKeySecret: e.target.value})} className="p-2 border rounded" />
            </div>
          )}
          <button className="px-4 py-2 bg-[#008080] text-white rounded">Save Payment</button>
        </form>
      </section>

      {/* Order settings */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Order Settings</h3>
        <form onSubmit={onSaveOrder} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input value={order.autoCancelMins} onChange={e => setOrder({...order, autoCancelMins: e.target.value})} className="p-2 border rounded" placeholder="Auto-cancel (mins)" />
            <input value={order.minOrderValue} onChange={e => setOrder({...order, minOrderValue: e.target.value})} className="p-2 border rounded" placeholder="Min order value" />
            <input value={order.maxQuantityPerOrder} onChange={e => setOrder({...order, maxQuantityPerOrder: e.target.value})} className="p-2 border rounded" placeholder="Max quantity per order" />
          </div>
          <button className="px-4 py-2 bg-[#008080] text-white rounded">Save Order</button>
        </form>
      </section>

      {/* Notifications */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <form onSubmit={onSaveNotifications} className="space-y-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={notifications.emailOnNewOrder} onChange={e => setNotifications({...notifications, emailOnNewOrder: e.target.checked})} /> Email on new order</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={notifications.smsOnNewOrder} onChange={e => setNotifications({...notifications, smsOnNewOrder: e.target.checked})} /> SMS on new order</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={notifications.lowStockAlert} onChange={e => setNotifications({...notifications, lowStockAlert: e.target.checked})} /> Low stock alerts</label>
          <button className="px-4 py-2 bg-[#008080] text-white rounded">Save Notifications</button>
        </form>
      </section>

      {/* Appearance */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Appearance</h3>
        <form onSubmit={onSaveAppearance} className="space-y-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={appearance.darkMode} onChange={e => setAppearance({...appearance, darkMode: e.target.checked})} /> Dark mode</label>
          <input type="color" value={appearance.primaryColor} onChange={e => setAppearance({...appearance, primaryColor: e.target.value})} />
          <button className="px-4 py-2 bg-[#008080] text-white rounded">Save Appearance</button>
        </form>
      </section>

      {/* Legal */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">App Info & Legal</h3>
        <textarea defaultValue={settings.aboutText} className="w-full p-2 border rounded mb-2" onBlur={e => saveSettings({ aboutText: e.target.value })} rows={3} placeholder="About text" />
        <textarea defaultValue={settings.privacyPolicy} className="w-full p-2 border rounded mb-2" onBlur={e => saveSettings({ privacyPolicy: e.target.value })} rows={3} placeholder="Privacy policy" />
        <textarea defaultValue={settings.terms} className="w-full p-2 border rounded mb-2" onBlur={e => saveSettings({ terms: e.target.value })} rows={3} placeholder="Terms & conditions" />
      </section>

      {/* Backup / Export */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Backup & Export</h3>
        <button onClick={exportUsers} className="px-4 py-2 bg-blue-600 text-white rounded">Export users (CSV)</button>
      </section>

      {/* Danger Zone */}
      <section className="bg-white p-4 rounded shadow mb-4 border border-red-200">
        <h3 className="font-semibold mb-2 text-red-600">Danger Zone</h3>
        <p className="text-sm text-gray-600 mb-2">Dangerous operations. Protect with admin auth & confirm dialogs.</p>
        <div className="flex gap-2">
          <button onClick={dangerClearUsers} className="px-4 py-2 bg-red-600 text-white rounded">Delete non-admin users</button>
          <button onClick={dangerClearOrders} className="px-4 py-2 bg-red-600 text-white rounded">Delete all orders</button>
        </div>
      </section>

    </div>
  );
};

export default SettingsPage;
