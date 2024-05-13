import {
  PORT,
} from "./config/config";
import express from "express";
import cors from "cors";
import { initMongoDB } from "config/mongodb";
// import routes from "routes";
import errorMiddleware from "middlewares/error.middleware";
import logger from "utils/logger";
import morganMiddleware from "middlewares/morgan.middleware";

const app = express();
const port = PORT || 8003;

//Setting Up Middlewares
app.use(express.json());
app.use(cors());
app.use(morganMiddleware);

//Setting Up MongoDB
initMongoDB();

//Setting Up Routes
// routes.forEach((route) => {
//   app.use('/',route.router);
// })
app.get("/", async (req,res) => {
  res.json({ 
    message: "HotelBooking BookingService Status: OK",
  });
});

//Setting Up Error Handling
app.use(errorMiddleware);

//Firing up Server
app.listen(port, async () => {
  logger.info(`************************************************`);
  logger.info(`**** Booking Service Listening on port ${port} ****`);
  logger.info(`************************************************`);
});
