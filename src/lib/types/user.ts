export interface User {
  id: string
  username: string
  email: string
  password?: string
  created_at: string
  updated_at: string
  is_active: boolean
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
