import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    REPORT_TEMPLATE, LEC_WELCOME_TEMPLATE,
} from "./emailTemplate.js";
import {mailtrap_client, mailtrap_sender} from "./mailtrap.config.js";


const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}];

    console.log(recipient);
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
        const response = await mailtrap_client.send({
            from: mailtrap_sender,
            to: recipient,
            template_uuid: "0b9faee6-397f-4d74-8547-cb60051c266c",
            template_variables: {
                company_info_name: "Kisii Impact Institute of Science and Technology",
                name: name,
                company_info_address: "Po Box 126",
                company_info_city: "Kisii",
                company_info_zip_code: "40332",
                company_info_country: "Kenya",
            },
        });

    } catch (error) {

        throw new Error(`Error sending welcome email: ${error}`);
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

export {
    sendLecWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail,
    sendWelcomeEmail,
    sendVerificationEmail,
    sendErrorFoundEmail,
};