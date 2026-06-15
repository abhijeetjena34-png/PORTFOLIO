import nodemailer from "nodemailer";
import sendgrid from "@sendgrid/mail";

const isPlaceholder = (value = "") =>
  value.includes("your-email@gmail.com") || value.includes("your-app-password");

const hasSmtpConfig = () => {
  const required = [
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER,
    process.env.SMTP_PASS,
    process.env.CONTACT_RECEIVER_EMAIL
  ];

  if (!required.every(Boolean)) {
    return false;
  }

  if (isPlaceholder(process.env.SMTP_USER) || isPlaceholder(process.env.SMTP_PASS)) {
    return false;
  }

  return true;
};

const hasSendGridConfig = () => !!process.env.SENDGRID_API_KEY && !!process.env.CONTACT_RECEIVER_EMAIL;

export const sendContactEmail = async ({ name, email, subject, message }) => {
  if (process.env.MAIL_DISABLED === "true") {
    return { sent: false, status: "not_configured" };
  }

  // Prefer SendGrid if API key provided
  if (hasSendGridConfig()) {
    try {
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: process.env.CONTACT_RECEIVER_EMAIL,
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
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
        `
      };
      await sendgrid.send(msg);
      return { sent: true, status: "sent", provider: "sendgrid" };
    } catch (error) {
      console.error("SendGrid delivery failed:", error && error.message ? error.message : error);
      return { sent: false, status: "failed", provider: "sendgrid", errorMessage: error.message || String(error) };
    }
  }

  // Fallback to SMTP if configured
  if (!hasSmtpConfig()) {
    return { sent: false, status: "not_configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
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
      `
    });

    return { sent: true, status: "sent", provider: "smtp" };
  } catch (error) {
    console.error(`Email delivery failed: ${error && error.message ? error.message : error}`);

    // Friendly, actionable messages
    let userFriendly = "Message saved, but email delivery failed. Please check SMTP settings.";
    if (String(error.message || "").includes("Invalid login") || String(error.message || "").includes("Application-specific password required")) {
      userFriendly = "Message saved, but email failed: invalid SMTP login. Check terminal for Ethereal test email link!";
      
      try {
        console.log("---------------------------------------------------------");
        console.log("⚠️ GMAIL AUTH FAILED. FALLING BACK TO ETHEREAL TEST EMAIL ⚠️");
        console.log("---------------------------------------------------------");
        const testAccount = await nodemailer.createTestAccount();
        const testTransporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const info = await testTransporter.sendMail({
          from: '"Portfolio Test" <test@portfolio.com>',
          to: "test-receiver@portfolio.com",
          replyTo: email,
          subject: `Portfolio Contact: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h2>New Portfolio Contact Message (TEST MODE)</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
          `
        });

        console.log("✅ TEST EMAIL SENT SUCCESSFULLY!");
        console.log("🔗 VIEW YOUR TEST EMAIL HERE: %s", nodemailer.getTestMessageUrl(info));
        console.log("---------------------------------------------------------");
        console.log("To receive real emails in your Gmail, you MUST generate a Gmail App Password");
        console.log("and update SMTP_PASS in your backend/.env file.");
        console.log("---------------------------------------------------------");

        return {
          sent: true,
          status: "sent_via_test_account",
          provider: "ethereal_test",
          testMessageUrl: nodemailer.getTestMessageUrl(info),
          userFriendly
        };
      } catch (testError) {
        console.error("Ethereal fallback failed:", testError);
      }
    }

    return {
      sent: false,
      status: "failed",
      provider: "smtp",
      errorCode: error.code || "UNKNOWN_ERROR",
      errorMessage: error.message,
      userFriendly
    };
  }
};
