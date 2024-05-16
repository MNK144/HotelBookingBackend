import { Router } from "express";
import validationMiddleware from "middlewares/validation.middleware";
import { HotelIdSchema, HotelUpsertSchema } from "./hotel.validations";
import { deleteHotel, getHotelDetails, upsertHotel } from "./hotel.controllers";

const HotelRouter = Router();

HotelRouter.post(
  `/upsert`,
  validationMiddleware(HotelUpsertSchema),
  upsertHotel
);

HotelRouter.post(
  `/delete`,
  validationMiddleware(HotelIdSchema),
  deleteHotel
);

HotelRouter.post( // PUBLIC ENDPOINT
  `/get-details`,
  validationMiddleware(HotelIdSchema),
  getHotelDetails
);

// HotelRouter.post(
//   `/list`,
//   validationMiddleware(LoginSchema),
//   userLogin
// );


export default HotelRouter;