import { generalResponse } from "helpers/common.helper";
import { getHotelByIdService } from "modules/hotel/hotel.services";
import { Controller } from "types/types";
import { addRoomToHotelService, deleteRoomByIdService, getRoomByIdService, upsertRoomService } from "./room.services";
import redisClient from "config/redis";

export const upsertRoom: Controller = async (req, res, next) => {
  try {
    const {
      id,
      title,
      description,
      images,
      amenities,
      guests,
      hotelID
    } = req.body;
    const userId = req.headers["x-user-id"] as string;

    if(id) {
      let roomData = await getRoomByIdService(id, true);
      console.log("roomData",roomData);
      if(!roomData) {
        return generalResponse(res, null, "Room not found", false, true, 404);
      } else if(String(roomData.hotel.ownerID) !== userId) {
        return generalResponse(res, null, "Unauthorized", false, true, 401);
      }
    } else {
      let hotelData = await getHotelByIdService(hotelID);
      if(!hotelData) {
        return generalResponse(res, null, "Hotel not found", false, true, 404);
      } else if(String(hotelData.ownerID) !== userId) {
        return generalResponse(res, null, "Unauthorized", false, true, 401);
      }
    }
    const updatedRoomData = await upsertRoomService({
      title,
      description,
      images,
      amenities,
      guests,
      hotel: hotelID
    },id);

    if(updatedRoomData) {
      await redisClient.del("room", id);
      await addRoomToHotelService(hotelID, updatedRoomData.id);
      await redisClient.del("hotel", hotelID);
      return generalResponse(res, updatedRoomData, `Room ${id?"Updated":"Created"} Successfully`, true, true, 200);
    } else {
      return generalResponse(res, null, "Failed to create or update room", false, true, 400);
    }
  } catch (error) {
    next(error);
  }
}

export const deleteRoom: Controller = async (req, res, next) => {
  try {
    const { id } = req.body;
    const userId = req.headers["x-user-id"] as string;

    const roomData: any = await getRoomByIdService(id, true);
    console.log("RoomData",roomData);
    if(!roomData) {
      return generalResponse(res, null, "Room not found", false, true, 404);
    } else if(roomData.hotel.ownerID.toString() !== userId) {
      return generalResponse(res, null, "Unauthorized", false, true, 401);
    }
    await redisClient.del("room", id);
    await deleteRoomByIdService(id);
    return generalResponse(res, null, "Room Deleted Successfully", true, true);
  } catch (error) {
    next(error);
  }
}

export const getRoomDetails: Controller = async (req, res, next) => {
  try {
    const { id } = req.body;

    const cachedData = await redisClient.get("room", id);
    if(cachedData) {
      return generalResponse(res, cachedData);
    }
    const roomData: any = await getRoomByIdService(id);
    if(!roomData) {
      return generalResponse(res, null, "Room not found", false, true, 404);
    }
    redisClient.set("room", id, roomData).catch(() => {});
    return generalResponse(res, roomData);
  } catch (error) {
    next(error);
  }
}