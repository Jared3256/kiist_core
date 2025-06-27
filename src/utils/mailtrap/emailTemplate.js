const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    
    <div style="text-align: center; margin: 30px 0;">
     <div style=" margin-top: 20px;
      background: #f0f4f8;
      padding: 15px;
      border-left: 4px solid #4CAF50;
      border-radius: 4px;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span></div>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Kisii Impact Institute<br>Sir. Jared Odhiambo</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


const REPORT_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Maintenance</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: "75%"; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">System Error Service</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="font-size: 16px>Hello,</p>
    <p style="font-size: 14px>A user has encountered an error on the frontend. Kindly attend to it <b>AS SOON AS POSSIBLE</b>:</p>
    <div style="margin: 30px 0;">
      <span style="font-size: 12px; font-weight: bold;  color: #4CAF50;">{error}</span>
    </div>
   
  
    <p style="font-size: 14px">Best regards,<br>Jared Odhiambo</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="margin-bottom:10px;text-align: center;">

<img src=
        "https://i.ibb.co/RGD6qdSH/Shan.png"
         width="100" height="100" 
         alt="Kisii Impact">
</div>
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Kisii Impact Institute<br>Sir. Jared Odhiambo</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


const LEC_WELCOME_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 650px;
      margin: 30px auto;
      background: #fff;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h4 {
      color: #2d6cdf;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: #2d6cdf;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 20px;
    }
    .note {
      margin-top: 30px;
      font-size: 14px;
      color: #aa0000;
    }
    .credentials {
      margin-top: 20px;
      background: #f0f4f8;
      padding: 15px;
      border-left: 4px solid #2d6cdf;
      border-radius: 4px;
    }
    .footer {
      font-size: 12px;
      color: #777;
      margin-top: 40px;
      text-align: center;
    }
  </style>
</head>
<body>

  <div class="container">
  <div style="margin-bottom:10px;text-align: center;">

<img src=
        "https://scontent.fnbo19-2.fna.fbcdn.net/v/t39.30808-6/219040140_105522371818357_769414503745360246_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHjogr2NfG8T4vFMHLPFcjLrsAbrVMxY5GuwButUzFjkdImpwboEGa74rde_--E5Fl-zLx7HPaD4w_0qToy7wGA&_nc_ohc=9_hSt1Dg6Z0Q7kNvwF83a4S&_nc_oc=AdmyuGRf4Qluae1AWBdGc5AMdPQsaAVHw7lGhsmJ3tySEzO2alda82EmNaWMNpYqicjMQzdOejL3BMrsMIgtXxPP&_nc_zt=23&_nc_ht=scontent.fnbo19-2.fna&_nc_gid=SDtL-mb3KPiChE1XJMyi5A&oh=00_AfMNkdFyhzKRpmm-5NiG2H2qALmKPHCobov9aSBoVqRbGw&oe=6864A77A"
         width="100" height="100" 
         alt="Kisii Impact">
</div>
    <h4>Welcome to KIIST!</h4>

    <p>Dear Lecturer,</p>

    <p>We’re excited to have you on board as part of the academic team at <strong>Kisii Impact Institute of Science and Technology</strong>. Your teaching credentials have been created, and you can now access the lecturer portal using the following login information:</p>

    <div class="credentials">
      <p><strong>Username:</strong> {{username}}</p>
      <p><strong>Password:</strong> {{password}}</p>
    </div>

    <p>You can log in to the portal using the button below:</p>

    <a href="https://kiist.vercel.app/auth/login" class="btn">Login to Your Account</a>

    <div class="note">
      ⚠️ Please change your password immediately after logging in to ensure your account security.
    </div>

    <p>We’re here to support you. If you have any questions, feel free to contact the IT support team.</p>

   
<p>Welcome once again!,<br><br>Kisii Impact Institute<br><br>Sir. Jared Odhiambo</p>
    <div class="footer">
      © 2025 KIIST. All rights reserved.
    </div>
  </div>
</body>
</html>
`
const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
<div style="margin-bottom:10px;text-align: center;">

<img src=
        "https://i.ibb.co/RGD6qdSH/Shan.png"
         width="100" height="100" 
         alt="Kisii Impact">
</div>

 
  <div style="background: linear-gradient(to right, #001db1, #0025bd); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #001db1; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 15 minutes for security reasons.</p>
    <p>Best regards,<br>Kisii Impact Institute<br>Sir. Jared Odhiambo</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export {
    LEC_WELCOME_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    REPORT_TEMPLATE,
};