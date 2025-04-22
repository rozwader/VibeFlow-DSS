import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (toEmail, username) => {
  await transporter.sendMail({
    from: `"VibeFlow 🎵" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Witamy w VibeFlow!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Witaj ${username}👋</h2>
        <p>Dziękuemy ze rejestrację na <strong>VibeFlow</strong>!</p>
        <p>— The VibeFlow Team</p>
      </div>
    `,
  });
};
