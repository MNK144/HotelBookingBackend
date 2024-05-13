import { config } from 'dotenv';

config();

export const {
  PORT,
  LOG_DIR,
  MONGODB_CONNECTION_STRING,
} = process.env;