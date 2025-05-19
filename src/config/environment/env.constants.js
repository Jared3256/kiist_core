import dotenv from'dotenv';

dotenv.config();

const system_data=  {
PORT: process.env.PORT ||3500 ,
DEVELOPMENT_DATABASE_URI: process.env.DEVELOPMENT_DATABASE_URI,
    PRODUCTION_DATABASE_URI: process.env.PRODUCTION_DATABASE_URI,
    NODE_ENV: process.env.NODE_ENV || 'development',

}

export default system_data;