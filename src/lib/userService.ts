import { MongoClient, Db, Collection } from 'mongodb'
import type { User, UserLoginPayload, UserSignupPayload, AuthResponse } from './types/user'

class UserService {
  private static instance: UserService
  private client: MongoClient | null = null
  private db: Db | null = null
  private usersCollection: Collection<User> | null = null
  private mongoUri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/reefs_io'
  private dbName: string = 'reefs_io'
  private collectionName: string = 'users'

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async connect(): Promise<void> {
    try {
      if (this.client) {
        console.log('MongoDB already connected')
        return
      }

      this.client = new MongoClient(this.mongoUri)
      await this.client.connect()
      this.db = this.client.db(this.dbName)
      this.usersCollection = this.db.collection(this.collectionName)

      await this.usersCollection.createIndex({ username: 1 }, { unique: true })
      await this.usersCollection.createIndex({ email: 1 }, { unique: true })

      console.log('MongoDB connected successfully')
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
      this.db = null
      this.usersCollection = null
      console.log('MongoDB disconnected')
    }
  }

  async verifyUser(username: string): Promise<boolean> {
    try {
      if (!this.usersCollection) {
        await this.connect()
      }

      const user = await this.usersCollection!.findOne({ username })
      return !!user
    } catch (error) {
      console.error('Error verifying user:', error)
      return false
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      if (!this.usersCollection) {
        await this.connect()
      }

      const user = await this.usersCollection!.findOne({ username })
      return user || null
    } catch (error) {
      console.error('Error getting user:', error)
      return null
    }
  }

  async createUser(payload: UserSignupPayload): Promise<AuthResponse> {
    try {
      if (!this.usersCollection) {
        await this.connect()
      }

      const existingUser = await this.usersCollection!.findOne({
        $or: [{ username: payload.username }, { email: payload.email }]
      })

      if (existingUser) {
        return {
          success: false,
          message: 'Username or email already exists'
        }
      }

      const newUser: User = {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      }

      const result = await this.usersCollection!.insertOne(newUser as any)

      return {
        success: true,
        user: {
          _id: result.insertedId.toString(),
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt
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
      if (!this.usersCollection) {
        await this.connect()
      }

      const user = await this.usersCollection!.findOne({ username: payload.username })

      if (!user) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      if (user.password !== payload.password) {
        return {
          success: false,
          message: 'Invalid password'
        }
      }

      const { password, ...userWithoutPassword } = user

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
      if (!this.usersCollection) {
        await this.connect()
      }

      updates.updatedAt = new Date()

      const result = await this.usersCollection!.findOneAndUpdate(
        { username },
        { $set: updates },
        { returnDocument: 'after' }
      )

      if (!result) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      return {
        success: true,
        user: result as User,
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
      if (!this.usersCollection) {
        await this.connect()
      }

      const result = await this.usersCollection!.deleteOne({ username })

      if (result.deletedCount === 0) {
        return {
          success: false,
          message: 'User not found'
        }
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
      if (!this.usersCollection) {
        await this.connect()
      }

      return await this.usersCollection!.find({}).toArray() as User[]
    } catch (error) {
      console.error('Error getting all users:', error)
      return []
    }
  }
}

export default UserService.getInstance()
