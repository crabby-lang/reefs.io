export interface User {
  _id?: string
  username: string
  email: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
  isActive?: boolean
}

export interface UserLoginPayload {
  username: string
  password: string
}

export interface UserSignupPayload {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  message?: string
  token?: string
}
