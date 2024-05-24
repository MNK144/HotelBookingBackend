import { config } from 'dotenv';

config();

export const {
  PORT,
  LOG_DIR,
  MONGODB_CONNECTION_STRING,
  REDIS_HOST,
  REDIS_PORT,
} = process.env;