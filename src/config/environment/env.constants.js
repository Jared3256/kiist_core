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
  STKPUSH_URI: process.env.STKPUSH_URI,
  PASSWORD: process.env.PASSWORD,
  DEV_CALLBACK_URI: `${
    String(environment).match("development")
      ? process.env.DEV_CALLBACK_URI
      : "/api/v1/payment/daraja_callback"
        }`,
  SHORT_CODE :process.env.SHORT_CODE
};

export default system_data;
