import { generalResponse } from "helpers/common.helper";
import { getHotelByIdService } from "modules/hotel/hotel.services";
import { Controller } from "types/types";
import { addRoomToHotelService, deleteRoomByIdService, getRoomByIdService, upsertRoomService } from "./room.services";

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

    let hotelData = await getHotelByIdService(hotelID);
    if (!hotelData) {
      return generalResponse(res, null, "Hotel not found", false, true, 404);
    } else if (String(hotelData.ownerID) !== userId) {
      return generalResponse(res, null, "Unauthorized", false, true, 401);
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
      await addRoomToHotelService(hotelID, updatedRoomData._id);
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
    await deleteRoomByIdService(id);
    return generalResponse(res, null, "Room Deleted Successfully", true, true);
  } catch (error) {
    next(error);
  }
}

export const getRoomDetails: Controller = async (req, res, next) => {
  try {
    const { id } = req.body;
    const roomData: any = await getRoomByIdService(id);
    if(!roomData) {
      return generalResponse(res, null, "Room not found", false, true, 404);
    }
    return generalResponse(res, roomData);
  } catch (error) {
    next(error);
  }
}