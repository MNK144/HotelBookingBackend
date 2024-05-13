import { config } from 'dotenv';

config();

export const {
  PORT,
  LOG_DIR,
  ACCESS_TOKEN_SECRET,
  USER_SERVICE_URL,
  HOTEL_SERVICE_URL,
  BOOKING_SERVICE_URL
} = process.env;