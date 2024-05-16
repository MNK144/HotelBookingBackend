import Hotel from "models/Hotel";
import { HotelInterface } from "./hotel.interfaces";
import { Types } from "mongoose";

// export async function createHotelService(hotelData: CreateHotelInterface){
//   const createdHotel = await Hotel.create(hotelData);
//   return createdHotel;
// }

export async function getHotelByIdService(id: string){
  const hotelData = await Hotel.findById(id);
  return hotelData;
}

export async function upsertHotelService(hotelData: HotelInterface, id: string = null) {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    id ?? new Types.ObjectId(),
    hotelData,
    { upsert: true, new: true },
  );
  return updatedHotel;
}

export async function deleteHotelService(id: string) {
  const deletedHotel = await Hotel.findByIdAndDelete(id);
  return deletedHotel;
}