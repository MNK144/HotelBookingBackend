import { Schema, Types, model } from "mongoose";

const HotelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String]
    },
    address: String,
    city: String,
    state: String,
    country: String,
    lat: {
      type: Number, //For Maps
    },
    long: {
      type: Number, //For Maps
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    amenities: [{
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: false,
      }
    }],
    ownerID: {
      type: Types.ObjectId,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export default model("Hotel", HotelSchema);