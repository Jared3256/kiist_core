import dotenv from "dotenv";

dotenv.config();

const environment = process.env.NODE_ENV || "development";

const system_data = {
    PORT: process.env.PORT || 3500,
    DEVELOPMENT_DATABASE_URI: process.env.DEVELOPMENT_DATABASE_URI,
    PRODUCTION_DATABASE_URI: process.env.PRODUCTION_DATABASE_URI,
    NODE_ENV: environment,
    BEARER: process.env.Bearer,
    AUTHORIZATION_URI: process.env.AUTHORIZATION_URI,
    C2B_REGISTER_URL: process.env.C2B_REGISTER_URL,
    STKPUSH_URI: process.env.STKPUSH_URI,
    PASSWORD: process.env.PASSWORD,
    DEV_CALLBACK_URI: `${
        environment === "development"
            ? process.env.DEV_CALLBACK_URI
            : process.env.PROD_CALLBACK_URI
    }`,
    SHORT_CODE: process.env.SHORT_CODE,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKETS: process.env.FIREBASE_STORAGE_BUCKETS,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,

    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKETS_NAME: process.env.AWS_BUCKETS_NAME,
};

console.log(system_data)

export default system_data;
