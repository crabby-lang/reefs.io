import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import userService from '../../../../lib/userService'
import type { AuthResponse } from '../../../../lib/types/user'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    try {
      const id = event.context.params?.id

      if (!id || id.trim() === '') {
        setResponseStatus(event, 400)
        return { success: false, message: 'User ID is required' }
      }

      await userService.connect()
      const user = await userService.getUserById(id)

      if (!user) {
        setResponseStatus(event, 404)
        return { success: false, message: 'User not found' }
      }

      return { success: true, user, message: 'User retrieved successfully' }
    } catch (error) {
      console.error('Error in GET /api/user/[id]:', error)
      setResponseStatus(event, 500)
      return { success: false, message: 'Failed to retrieve user' }
    }
  } else if (event.node.req.method === 'POST') {
    try {
      const generatedId = crypto.randomUUID()
      const body = await readBody(event)

      await userService.connect()

      const response: AuthResponse = {
        success: true,
        message: 'Unique ID generated',
        user: {
          id: generatedId,
          username: body.username || '',
          email: body.email || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true
        }
      }

      setResponseStatus(event, 201)
      return response
    } catch (error) {
      console.error('Error in POST /api/user/[id]:', error)
      setResponseStatus(event, 500)
      return { success: false, message: 'Failed to generate ID' }
    }
  }
})
