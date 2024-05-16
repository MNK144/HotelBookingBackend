import Joi from "joi";
import { errorMessage } from "constants/validationError";

export const HotelUpsertSchema = Joi.object({
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
  address: Joi.string()
    .max(100)
    .label("Address")
    .messages({ ...errorMessage }),
  city: Joi.string()
    .max(100)
    .label("City")
    .messages({ ...errorMessage }),
  state: Joi.string()
    .max(100)
    .label("State")
    .messages({ ...errorMessage }),
  country: Joi.string()
    .max(100)
    .label("Country")
    .messages({ ...errorMessage }),
  lat: Joi.number()
    .label("lat")
    .messages({ ...errorMessage }),
  long: Joi.number()
    .label("long")
    .messages({ ...errorMessage }),
  checkIn: Joi.string()
    .max(500)
    .label("Checkin Details")
    .messages({ ...errorMessage }),
  checkOut: Joi.string()
    .max(500)
    .label("Checkout Details")
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
    address: Joi.string()
      .required()
      .max(100)
      .label("Address")
      .messages({ ...errorMessage }),
    city: Joi.string()
      .required()
      .max(100)
      .label("City")
      .messages({ ...errorMessage }),
    state: Joi.string()
      .required()
      .max(100)
      .label("State")
      .messages({ ...errorMessage }),
    country: Joi.string()
      .required()
      .max(100)
      .label("Country")
      .messages({ ...errorMessage }),
    lat: Joi.number()
      .label("lat")
      .messages({ ...errorMessage }),
    long: Joi.number()
      .label("long")
      .messages({ ...errorMessage }),
    checkIn: Joi.string()
      .required()
      .max(500)
      .label("Checkin Details")
      .messages({ ...errorMessage }),
    checkOut: Joi.string()
      .required()
      .max(500)
      .label("Checkout Details")
      .messages({ ...errorMessage }),
  })
}).options({
    abortEarly: false,
  });

export const HotelIdSchema = Joi.object({
  id: Joi.string()
    .hex()
    .required()
    .length(24)
    .label("ID")
    .messages({ ...errorMessage })
}).options({
  abortEarly: false,
});