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
    images: {
      type: [String]
    },
    amenities: [{
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
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
      },
      discount: {
        type: Number, // Percent
        default: 0,
      },
      taxCharges: {
        type: Number, // Whole Amount
        required: true,
      }
    }],
    hotel: {
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