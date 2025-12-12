interface ApiConfig {
  baseUrl: string
  endpoints: {
    auth: {
      login: string
      signup: string
      verify: string
    }
    publish: {
      submit: string
      list: string
    }
  }
}

const API_CONFIG: ApiConfig = {
  baseUrl: process.env.VITE_API_URL || 'http://localhost:5173/api',
  endpoints: {
    auth: {
      login: '/auth/login',
      signup: '/auth/signup',
      verify: '/auth/verify'
    },
    publish: {
      submit: '/publish/submit',
      list: '/publish/list'
    }
  }
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_CONFIG.baseUrl) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Request failed: ${method} ${endpoint}`, error)
      throw error
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, headers)
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('POST', endpoint, data, headers)
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, data, headers)
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, headers)
  }

  /**
   * Get authorization headers with token
   */
  getAuthHeaders(token: string): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`
    }
  }
}

export default new ApiClient()
export { API_CONFIG }
