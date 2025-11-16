// sendMail.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Gmail transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_GMAIL@gmail.com",     // 👈 apna Gmail daalein
        pass: "YOUR_APP_PASSWORD",        // 👈 Gmail App Password (not normal password)
      },
    });

    const mailOptions = {
      from: email,
      to: "YOUR_GMAIL@gmail.com",         // 👈 jis Gmail pe aapko message chahiye
      subject: `Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

export default router;
