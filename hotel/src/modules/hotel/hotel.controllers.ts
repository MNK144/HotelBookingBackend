import { generalResponse } from "helpers/common.helper";
import { Controller } from "types/types";
import { deleteHotelService, getHotelByIdService, upsertHotelService } from "./hotel.services";

export const upsertHotel: Controller = async (req, res, next) => {
  try {
    const { 
      id,
      title,
      description,
      images,
      address,
      city,
      state,
      country,
      lat,
      long,
      checkIn,
      checkOut,
      amenities,
    } = req.body;
    const userId = req.headers["x-user-id"] as string;

    if(id) {
      let hotelData = await getHotelByIdService(id);
      if(!hotelData) {
        return generalResponse(res, null, "Hotel not found", false, true, 404);
      } else if(String(hotelData.ownerID) !== userId) {
        return generalResponse(res, null, "Unauthorized", false, true, 401);
      }
    }

    const updatedHotelData = await upsertHotelService({
      title,
      description,
      images: images,
      address,
      city,
      state,
      country,
      lat,
      long,
      checkIn,
      checkOut,
      amenities,
      ownerID: userId
    },id);
    return generalResponse(res, updatedHotelData, `Hotel ${id?"Updated":"Created"} Successfully`, true, true);
  } catch (error) {
    console.log("error",error);
    next(error);
  }
};

export const deleteHotel: Controller = async (req, res, next) => {
  try {
    const { id } = req.body;
    const userId = req.headers["x-user-id"] as string;

    let hotelData = await getHotelByIdService(id);
    if(!hotelData) {
      return generalResponse(res, null, "Hotel not found", false, true, 404);
    } else if(String(hotelData.ownerID) !== userId) {
      return generalResponse(res, null, "Unauthorized", false, true, 401);
    }
    await deleteHotelService(id);
    return generalResponse(res, null, "Hotel Deleted Successfully", true, true);
  } catch (error) {
    next(error);
  }
}

export const getHotelDetails: Controller = async (req, res, next) => {
  try {
    const { id } = req.body;
    const hotelData = await getHotelByIdService(id);
    if(!hotelData) {
      return generalResponse(res, null, "Hotel not found", false, true, 404);
    }
    return generalResponse(res, hotelData);
  } catch(error) {
    next(error);
  }
}