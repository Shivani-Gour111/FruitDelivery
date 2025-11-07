import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignupStrict() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  // Name: allow only letters and spaces
  const handleNameChange = (e) => {
    const raw = e.target.value;
    // filter out anything that's not A-Z or space
    const filtered = raw.replace(/[^A-Za-z\s]/g, "");
    if (filtered !== raw) {
      toast.error("Name me sirf letters allowed — numbers/symbols nahi.", { duration: 2000 });
    }
    setName(filtered);
  };

  // Password: allow only letters (A-Z), no numbers/symbols
  const handlePasswordChange = (e) => {
    const raw = e.target.value;
    const filtered = raw.replace(/[^A-Za-z]/g, "");
    if (filtered !== raw) {
      toast.error("Password me sirf letters (A–Z) allowed — numbers/symbols nahi.", { duration: 2000 });
    }
    setPassword(filtered);
  };

  // Email: allow common email chars but block spaces and some invalid chars immediately
  const handleEmailChange = (e) => {
    const raw = e.target.value;
    // allow letters, numbers, @, ., _, -, +
    const filtered = raw.replace(/[^A-Za-z0-9@._\-+]/g, "");
    if (filtered !== raw) {
      toast.error("Email me spaces ya kuch special characters allowed nahi (use . _ - +).", { duration: 2000 });
    }
    setEmail(filtered);
    // clear email inline error while typing
    if (errors.email) setErrors((p) => ({ ...p, email: "" }));
  };

  // If paste happens, also sanitize to ensure no invalid content gets in
  const handlePasteName = (e) => {
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    if (/[^A-Za-z\s]/.test(pasted)) {
      e.preventDefault();
      toast.error("Pasting not allowed: Name me sirf letters allowed.", { duration: 2000 });
    }
  };
  const handlePastePassword = (e) => {
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    if (/[^A-Za-z]/.test(pasted)) {
      e.preventDefault();
      toast.error("Pasting not allowed: Password me sirf letters allowed.", { duration: 2000 });
    }
  };
  const handlePasteEmail = (e) => {
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    if (/[^A-Za-z0-9@._\-+]/.test(pasted)) {
      e.preventDefault();
      toast.error("Pasted email me kuch invalid characters hain.", { duration: 2000 });
    }
  };

    const handleEmailBlur = () => {
    if (email && !/^[^\s@]+@gmail\.com$/i.test(email.trim())) {
      setErrors((p) => ({ ...p, email: "Email must end with @gmail.com" }));
      toast.error("Email must end with @gmail.com", { duration: 2500 });
    } else {
      setErrors((p) => ({ ...p, email: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // final checks
    if (!name.trim()) {
      toast.error("Name required");
      return;
    }
    if (!email.trim()) {
      toast.error("Email required");
      return;
    }
    if (!/^[^\s@]+@gmail\.com$/i.test(email.trim())) {
      toast.error("Email must end with @gmail.com");
      return;
    }
    if (!password) {
      toast.error("Password required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 letters");
      return;
    }
    // All good — proceed (call API etc.)
    toast.success("All inputs valid — ready to submit!");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Signup (Strict)</h2>
        {/* Name */}
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          value={name}
          onChange={handleNameChange}
          onPaste={handlePasteName}
          placeholder="Only letters"
          className="w-full p-3 mb-3 rounded border"
        />
        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          value={email}
          onChange={handleEmailChange}
          onPaste={handlePasteEmail}
          onBlur={handleEmailBlur}
          placeholder="you@gmail.com"
          className="w-full p-3 mb-1 rounded border"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
        {/* Password */}
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          value={password}
          onChange={handlePasswordChange}
          onPaste={handlePastePassword}
          placeholder="Only letters, min 6 chars"
          className="w-full p-3 mb-3 rounded border"
        />
        <p className="text-xs text-gray-500 mb-4">Password must be letters only (A–Z) and at least 6 characters.</p>
        <button className="w-full bg-green-600 text-white py-3 rounded-full" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
