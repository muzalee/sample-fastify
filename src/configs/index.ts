import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};
