import Room from "models/Room";
import Hotel from "models/Hotel";
import { RoomInterface } from "./room.interfaces";
import { Types } from "mongoose";

export async function upsertRoomService(roomData: RoomInterface, id: string = null) {
  const updatedRoom = await Room.findByIdAndUpdate(
    id ?? new Types.ObjectId(),
    roomData,
    { upsert: true, new: true },
  );
  return updatedRoom;
}

export async function addRoomToHotelService(hotelId: string | Types.ObjectId, roomId: string | Types.ObjectId) {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    hotelId,
    { $push: { rooms: roomId } },
    { new: true },
  );
  return updatedHotel;
}

export async function getRoomByIdService(id: string, populate = false) {
  let roomData;
  if(populate) {
    roomData = await Room.findById(id).populate("hotel");
  } else {
    roomData = await Room.findById(id);
  }
  return roomData;
}

export async function deleteRoomByIdService(id: string) {
  const deletedRoom = await Room.findByIdAndDelete(id);
  return deletedRoom;
}