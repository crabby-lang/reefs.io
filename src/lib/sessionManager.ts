import type { User } from './types/user'

const STORAGE_KEY = ''
const TOKEN_KEY = ''

class SessionManager {
  static saveUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Failed to save user to storage:', error)
    }
  }

  static getUser(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to get user from storage:', error)
      return null
    }
  }

  static isAuthenticated(): boolean {
    return !!this.getUser()
  }

  static saveToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch (error) {
      console.error('Failed to save token:', error)
    }
  }

  static getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch (error) {
      console.error('Failed to get token:', error)
      return null
    }
  }

  static clearSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(TOKEN_KEY)
    } catch (error) {
      console.error('Failed to clear session:', error)
    }
  }

  static isValidSession(): boolean {
    const user = this.getUser()
    const token = this.getToken()
    return !!user && !!token
  }
}

export default SessionManager
