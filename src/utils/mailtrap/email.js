import {
    LEC_WELCOME_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    REPORT_TEMPLATE,
    STUDENT_FEE_REMINDER, STUDENT_WELCOME_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import {mailtrap_client, mailtrap_sender} from "./mailtrap.config.js";


const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}];

    try {
        const mailOptions = {
            from: mailtrap_sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}",
                verificationToken
            ),
            category: "Email Verification",
        };

        // Sanitize the mailOptions object
        Object.keys(mailOptions).forEach((key) => {
            if (typeof mailOptions[key] === "string") {
                mailOptions[key] = mailOptions[key]
                    .trim()
                    .replace(/[\u0080-\uFFFF]/g, "");
            }
        });

        const response = await mailtrap_client.send(mailOptions);

    } catch (error) {

        throw new Error(`Error sending verification email: ${error}`);
    }
};


const sendLecWelcomeEmail = async (email, username, password) => {
    const recipient = [{email}];
    try {
        const mailOptions = {
            from: mailtrap_sender,
            to: recipient,
            subject: "Welcome",
            html: LEC_WELCOME_TEMPLATE.replace(
                "{{username}}",
                username
            ).replace("{{password}}", password),
            category: "Welcome Email",
        };

        // Sanitize the mailOptions object
        Object.keys(mailOptions).forEach((key) => {
            if (typeof mailOptions[key] === "string") {
                mailOptions[key] = mailOptions[key]
                    .trim()
                    .replace(/[\u0080-\uFFFF]/g, "");
            }
        });

        const response = await mailtrap_client.send(mailOptions);

    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
}

const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}];
    try {
        const mailOptions = {
            from: mailtrap_sender,
            to: recipient,
            subject: "Welcome To Kisii Impact Institute",
            html: STUDENT_WELCOME_TEMPLATE.replace(
                "{{student_name}}",
                name
            ).replace("{{username}}", email),
            category: "Welcome Email",
        };

        // Sanitize the mailOptions object
        Object.keys(mailOptions).forEach((key) => {
            if (typeof mailOptions[key] === "string") {
                mailOptions[key] = mailOptions[key]
                    .trim()
                    .replace(/[\u0080-\uFFFF]/g, "");
            }
        });

        const response = await mailtrap_client.send(mailOptions);
        return response

    } catch (error) {
        console.error(`Error sending verification`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailtrap_client.send({
            from: mailtrap_sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
    } catch (error) {

        throw new Error(`Error sending password reset email: ${error}`);
    }
};

const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrap_client.send({
            from: mailtrap_sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

    } catch (error) {

        throw new Error(`Error sending password reset success email: ${error}`);
    }
};

const sendErrorFoundEmail = async (email, error, info) => {
    const recipient = [{email}];

    try {
        const response = await mailtrap_client.send({
            from: mailtrap_sender,
            to: recipient,
            subject: "Error Received - FrontEnd",
            html: REPORT_TEMPLATE.replace("{error}", String(error.componentStack) + " - " + String(info.componentStack)),
            category: "System Error - Bugs",
        });

    } catch (error) {

        throw new Error(`Error sending bug email: ${error}`);
    }
};


const sendStudentFeeReminder = async (email, name, amount_charged, amount_paid, balance, balance_text) => {
    const recipient = [{email}];

    try {
        const mailOptions = {
            from: mailtrap_sender,
            to: recipient,
            subject: "Fee Payment Reminder",
            html: STUDENT_FEE_REMINDER.replaceAll("{{balance_text}}", balance_text).replaceAll(
                "{{name}}",
                name
            ).replaceAll("{{balance}}", balance).replaceAll("{{amount_paid}}", amount_paid).replaceAll("{{amount_charged}}", amount_charged),
            category: "Fee Reminder",
        };

        // Sanitize the mailOptions object
        Object.keys(mailOptions).forEach((key) => {
            if (typeof mailOptions[key] === "string") {
                mailOptions[key] = mailOptions[key]
                    .trim()
                    .replace(/[\u0080-\uFFFF]/g, "");
            }
        });

        return await mailtrap_client.send(mailOptions)
    } catch (error) {

        throw new Error(`Error sending fee reminder email: ${error}`);
    }
}
export {
    sendStudentFeeReminder,
    sendLecWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail,
    sendWelcomeEmail,
    sendVerificationEmail,
    sendErrorFoundEmail,
};