import { Schema, Types, model } from "mongoose";

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
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
    guests: [{
      count: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    }],
    hotelID: {
      type: Types.ObjectId,
      ref: "Hotel",
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export default model("Room", RoomSchema);