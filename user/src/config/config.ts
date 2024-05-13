import { config } from 'dotenv';

config();

export const {
  PORT,
  LOG_DIR,
  MONGODB_CONNECTION_STRING,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE
} = process.env;