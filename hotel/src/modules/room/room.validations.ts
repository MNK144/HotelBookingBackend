import Joi from "joi";
import { errorMessage } from "constants/validationError";

export const RoomUpsertSchema = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .label("ID")
    .messages({ ...errorMessage }),
  title: Joi.string()
    .max(100)
    .label("Title")
    .messages({ ...errorMessage }),
  description: Joi.string()
    .max(1000)
    .label("Description")
    .messages({ ...errorMessage }),
  images: Joi.array()
    .items(Joi.string())
    .label("Images")
    .messages({ ...errorMessage }),
  amenities: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().max(50).required().label("Amenity Name"),
        icon: Joi.string().max(50).label("Amenity Icon"),
      })
    )
    .label("Amenities")
    .messages({ ...errorMessage }),
  guests: Joi.array()
    .items(
      Joi.object({
        count: Joi.number().max(50).required().label("Guest Count"),
        price: Joi.number().max(999999999).required().label("Room Price for Guests"),
        discount: Joi.number().max(100).label("Room Discount for Guests"),
        taxCharges: Joi.number().max(999999999).required().label("Tax & Charges for Guests"),
      })
    )
    .label("Guests")
    .messages({ ...errorMessage }),
}).when('.id', {
  not: Joi.exist(),
  then: Joi.object({
    title: Joi.string()
      .required()
      .max(100)
      .label("Title")
      .messages({ ...errorMessage }),
    description: Joi.string()
      .required()
      .max(1000)
      .label("Description")
      .messages({ ...errorMessage }),
    images: Joi.array()
      .required()
      .items(Joi.string())
      .label("Images")
      .messages({ ...errorMessage }),
    amenities: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().max(50).required().label("Amenity Name"),
          icon: Joi.string().max(50).label("Amenity Icon"),
        })
      )
      .label("Amenities")
      .messages({ ...errorMessage }),
    guests: Joi.array()
      .required()
      .items(
        Joi.object({
          count: Joi.number().max(50).required().label("Guest Count"),
          price: Joi.number().max(999999999).required().label("Room Price for Guests"),
          discount: Joi.number().max(100).label("Room Discount for Guests"),
          taxCharges: Joi.number().max(999999999).required().label("Tax & Charges for Guests"),
        })
      )
      .label("Guests")
      .messages({ ...errorMessage }),
    hotelID: Joi.string()
      .required()
      .hex()
      .length(24)
      .label("Hotel ID")
      .messages({ ...errorMessage }),
  })
}).options({
  abortEarly: false,
});

export const RoomIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .required()
    .length(24)
    .label("ID")
    .messages({ ...errorMessage })
}).options({
  abortEarly: false,
});