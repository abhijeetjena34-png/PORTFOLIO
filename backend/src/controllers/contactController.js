import Contact from "../models/Contact.js";
import { sendContactEmail } from "../config/mailer.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address."
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    const emailResult = await sendContactEmail({
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message
    });

    let responseMessage = "Message sent successfully. I will get back to you soon.";
    if (emailResult.status === "not_configured") {
      responseMessage = "Message saved successfully. Email delivery is not configured yet.";
    } else if (emailResult.status === "failed") {
      // Prefer friendly message from mailer if available
      if (emailResult.userFriendly) {
        responseMessage = emailResult.userFriendly;
      } else if (String(emailResult.errorMessage || "").includes("Invalid login")) {
        responseMessage =
          "Message saved, but email failed: invalid SMTP login. Use Gmail App Password.";
      } else if (String(emailResult.errorMessage || "").includes("Application-specific password required")) {
        responseMessage =
          "Message saved, but email failed: Gmail requires an App Password or OAuth2. See README for steps.";
      } else {
        responseMessage = "Message saved, but email delivery failed. Please check SMTP settings.";
      }
    }

    return res.status(201).json({
      success: true,
      message: responseMessage,
      data: {
        id: contact._id,
        createdAt: contact.createdAt,
        emailSent: emailResult.sent,
        emailStatus: emailResult.status,
        emailProvider: emailResult.provider || null,
        // expose errorMessage only in development for debugging
        emailError: process.env.NODE_ENV === "development" ? (emailResult.errorMessage || emailResult.userFriendly || null) : undefined
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};
