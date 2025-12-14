import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { User, UserLoginPayload, UserSignupPayload, AuthResponse } from './types/user'

class UserService {
  private static instance: UserService
  private supabase: SupabaseClient | null = null
  private supabaseUrl: string = process.env.VITE_SUPABASE_URL || ''
  private supabaseAnonKey: string = process.env.VITE_SUPABASE_ANON_KEY || ''
  private tableName: string = 'users'

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async connect(): Promise<void> {
    try {
      if (this.supabase) {
        console.log('Supabase already connected')
        return
      }

      if (!this.supabaseUrl || !this.supabaseAnonKey) {
        throw new Error('Missing Supabase URL or anonymous key in environment variables')
      }

      this.supabase = createClient(this.supabaseUrl, this.supabaseAnonKey)
      console.log('Supabase connected successfully')
    } catch (error) {
      console.error('Failed to connect to Supabase:', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    this.supabase = null
    console.log('Supabase disconnected')
  }

  async verifyUser(username: string): Promise<boolean> {
    try {
      if (!this.supabase) {
        await this.connect()
      }

      const { data, error } = await this.supabase!
        .from(this.tableName)
        .select('id')
        .eq('username', username)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return !!data
    } catch (error) {
      console.error('Error verifying user:', error)
      return false
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      if (!this.supabase) {
        await this.connect()
      }

      const { data, error } = await this.supabase!
        .from(this.tableName)
        .select('*')
        .eq('username', username)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data || null
    } catch (error) {
      console.error('Error getting user:', error)
      return null
    }
  }

  async createUser(payload: UserSignupPayload): Promise<AuthResponse> {
    try {
      if (!this.supabase) {
        await this.connect()
      }

      const { data: existingUser } = await this.supabase!
        .from(this.tableName)
        .select('id')
        .or(`username.eq.${payload.username},email.eq.${payload.email}`)
        .limit(1)

      if (existingUser && existingUser.length > 0) {
        return {
          success: false,
          message: 'Username or email already exists'
        }
      }

      const { data, error } = await this.supabase!
        .from(this.tableName)
        .insert([
          {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_active: true
          }
        ])
        .select()
        .single()

      if (error) {
        throw error
      }

      return {
        success: true,
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          created_at: data.created_at,
          updated_at: data.updated_at,
          is_active: data.is_active
        },
        message: 'User created successfully'
      }
    } catch (error) {
      console.error('Error creating user:', error)
      return {
        success: false,
        message: 'Failed to create user'
      }
    }
  }

  async authenticateUser(payload: UserLoginPayload): Promise<AuthResponse> {
    try {
      if (!this.supabase) {
        await this.connect()
      }

      const { data, error } = await this.supabase!
        .from(this.tableName)
        .select('*')
        .eq('username', payload.username)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (!data) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      if (data.password !== payload.password) {
        return {
          success: false,
          message: 'Invalid password'
        }
      }

      const { password, ...userWithoutPassword } = data

      return {
        success: true,
        user: userWithoutPassword as User,
        message: 'Authentication successful'
      }
    } catch (error) {
      console.error('Error authenticating user:', error)
      return {
        success: false,
        message: 'Authentication failed'
      }
    }
  }

  async updateUser(username: string, updates: Partial<User>): Promise<AuthResponse> {
    try {
      if (!this.supabase) {
        await this.connect()
      }

      const updatePayload = {
        ...updates,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await this.supabase!
        .from(this.tableName)
        .update(updatePayload)
        .eq('username', username)
        .select()
        .single()

      if (error) {
        throw error
      }

      if (!data) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      return {
        success: true,
        user: data as User,
        message: 'User updated successfully'
      }
    } catch (error) {
      console.error('Error updating user:', error)
      return {
        success: false,
        message: 'Failed to update user'
      }
    }
  }

  async deleteUser(username: string): Promise<AuthResponse> {
    try {
      if (!this.supabase) {
        await this.connect()
      }

      const { error } = await this.supabase!
        .from(this.tableName)
        .delete()
        .eq('username', username)

      if (error) {
        throw error
      }

      return {
        success: true,
        message: 'User deleted successfully'
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      return {
        success: false,
        message: 'Failed to delete user'
      }
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      if (!this.supabase) {
        await this.connect()
      }

      const { data, error } = await this.supabase!
        .from(this.tableName)
        .select('*')

      if (error) {
        throw error
      }

      return (data || []) as User[]
    } catch (error) {
      console.error('Error getting all users:', error)
      return []
    }
  }
}

export default UserService.getInstance()
