import {
  PORT,
  USER_SERVICE_URL,
  HOTEL_SERVICE_URL,
  BOOKING_SERVICE_URL
} from "./config/config";
import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import errorMiddleware from "middlewares/error.middleware";
import logger from "utils/logger";
import morganMiddleware from "middlewares/morgan.middleware";
import authMiddleware from "middlewares/auth.middleware";

const app = express();
const port = PORT || 8000;

//Setting Up Middlewares
app.use(express.json());
app.use(cors());
app.use(morganMiddleware);

//Auth Middleware
app.use(authMiddleware)

//Setting Up Routes
app.use('/user', proxy(USER_SERVICE_URL));
app.use('/hotel', proxy(HOTEL_SERVICE_URL));
app.use('/booking', proxy(BOOKING_SERVICE_URL));

app.get("/", async (req,res) => {
  res.json({ 
    message: "HotelBooking GatewayService Status: OK",
  });
});

//Setting Up Error Handling
app.use(errorMiddleware);

//Firing up Server
app.listen(port, async () => {
  logger.info(`************************************************`);
  logger.info(`**** Gateway Service Listening on port ${port} ****`);
  logger.info(`************************************************`);
});
