import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    isHotelOwner: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  },
);

export default model("User", UserSchema);
