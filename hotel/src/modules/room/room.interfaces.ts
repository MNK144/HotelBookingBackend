export type Amenity = {
  name: string,
  icon: string,
}

export type Guest = {
  count: number,
  price: number,
  discount?: number,
  taxCharges: number,
}

export interface RoomInterface {
  title?: string,
  description?: string,
  images?: string[],
  amenities?: Amenity[],
  guests?: Guest[],
  hotel: string,
}