import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "rudolph66@ethereal.email",
    pass: "QgNGYnrcBkHNQ7FAae",
  },
});

const mailOptions = {
  from: "rudolph66@ethereal.email",
  to: "odhiambojared566@gmail.com",
  subject: "Welcome to [Company Name]!",
  html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f0f0f0; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
          <h2 style="text-align: center; margin-bottom: 20px;">Welcome to Shan Infosystems!</h2>
          <p style="margin-bottom: 20px;">Hi Jared Odhiambo,</p>
          <p style="margin-bottom: 20px;">
            We are excited to have you on board. At Shan Infosystems, we are committed to providing you with the best
            experience and support as you begin your journey with us.
          </p>
          <p style="margin-bottom: 20px;">
            If you have any questions or need assistance, feel free to reach out to our team.
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="[Your Link Here]" style="padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px;">Get Started</a>
          </div>
        </div>
      </body>
      </html>`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
  } else {
  }
});
