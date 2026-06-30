import mongoose from "mongoose";
import nodemailer from "nodemailer";

// ─── MongoDB Connection (cached across serverless invocations) ───
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  cachedConnection = await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false,
  });
  return cachedConnection;
}

// ─── Contact Model ───
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [80, "Name cannot exceed 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [120, "Subject cannot exceed 120 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
  },
  { timestamps: true }
);

// Reuse model if already compiled (important for serverless warm starts)
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// ─── Email Helper ───
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendContactEmail({ name, email, subject, message }) {
  const hasConfig =
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_RECEIVER_EMAIL;

  if (!hasConfig) {
    return { sent: false, status: "not_configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Portfolio Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return { sent: true, status: "sent", provider: "smtp" };
  } catch (error) {
    console.error("Email delivery failed:", error.message);
    return {
      sent: false,
      status: "failed",
      provider: "smtp",
      errorMessage: error.message,
    };
  }
}

// ─── Serverless Handler ───
export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Save to MongoDB
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // Send email notification
    const emailResult = await sendContactEmail({
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
    });

    let responseMessage =
      "Message sent successfully. I will get back to you soon.";
    if (emailResult.status === "not_configured") {
      responseMessage =
        "Message saved successfully. Email delivery is not configured yet.";
    } else if (emailResult.status === "failed") {
      responseMessage =
        "Message saved, but email delivery failed. Please check SMTP settings.";
    }

    return res.status(201).json({
      success: true,
      message: responseMessage,
      data: {
        id: contact._id,
        createdAt: contact.createdAt,
        emailSent: emailResult.sent,
        emailStatus: emailResult.status,
      },
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}
