import {
  PORT,
} from "./config/config";
import express from "express";
import cors from "cors";
import { initMongoDB } from "config/mongodb";
import errorMiddleware from "middlewares/error.middleware";
import logger from "utils/logger";
import morganMiddleware from "middlewares/morgan.middleware";
import UserRouter from "modules/user/user.routes";
import AuthRouter from "modules/auth/auth.routes";

const app = express();
const port = PORT || 8001;

//Setting Up Middlewares
app.use(express.json());
app.use(cors());
app.use(morganMiddleware);

//Setting Up MongoDB
initMongoDB();

//Setting Up Routes
// app.use('/', UserRouter);
app.use('/', AuthRouter);

app.get("/", async (req,res) => {
  res.json({ 
    message: "HotelBooking UserService Status: OK",
  });
});

//Setting Up Error Handling
app.use(errorMiddleware);

//Firing up Server
app.listen(port, async () => {
  logger.info(`*********************************************`);
  logger.info(`**** User Service Listening on port ${port} ****`);
  logger.info(`*********************************************`);
});
