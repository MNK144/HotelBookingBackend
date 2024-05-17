import Hotel from "models/Hotel";
import { HotelInterface } from "./hotel.interfaces";
import { Types } from "mongoose";
import Room from "models/Room";

// export async function createHotelService(hotelData: CreateHotelInterface){
//   const createdHotel = await Hotel.create(hotelData);
//   return createdHotel;
// }

export async function getHotelByIdService(id: string){
  const hotelData = await Hotel.findById(id).populate("rooms");
  return hotelData;
}

export async function upsertHotelByIdService(hotelData: HotelInterface, id: string = null) {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    id ?? new Types.ObjectId(),
    hotelData,
    { upsert: true, new: true },
  );
  return updatedHotel;
}

export async function deleteHotelByIdService(id: string) {
  const deletedHotel = await Hotel.findByIdAndDelete(id);
  await Room.deleteMany({_id: {$in: deletedHotel.rooms}});
  return deletedHotel;
}