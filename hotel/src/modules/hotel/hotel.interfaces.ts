export type Amenity = {
  name: string,
  icon: string,
}

export interface HotelInterface {
  title?: string,
  description?: string,
  images?: string[],
  address?: string,
  city?: string,
  state?: string,
  country?: string,
  lat?: number,
  long?: number,
  checkIn?: string,
  checkOut?: string,
  amenities?: Amenity[],
  ownerID: string,
}