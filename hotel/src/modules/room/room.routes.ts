import { Router } from "express";
import validationMiddleware from "middlewares/validation.middleware";
import { RoomIdSchema, RoomUpsertSchema } from "./room.validations";
import { deleteRoom, getRoomDetails, upsertRoom } from "./room.controllers";

const RoomRouter = Router();
const BASEPATH = "/room";

RoomRouter.post(
  `${BASEPATH}/upsert`,
  validationMiddleware(RoomUpsertSchema),
  upsertRoom
);

RoomRouter.post(
  `${BASEPATH}/delete`,
  validationMiddleware(RoomIdSchema),
  deleteRoom
);

RoomRouter.post( // PUBLIC ENDPOINT
  `${BASEPATH}/get-details`,
  validationMiddleware(RoomIdSchema),
  getRoomDetails
);

// RoomRouter.post(
//   `${BASEPATH}/list`,
//   validationMiddleware(LoginSchema),
//   listRooms???
// );


export default RoomRouter;