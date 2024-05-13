export interface CreateUserInterface {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  isHotelOwner: boolean,
  email: string,
  password: string,
}

export interface UpdateUserInterface {
  id: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string,
  isHotelOwner?: boolean,
  email?: string,
  password?: string,
}