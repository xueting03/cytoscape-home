import axios from 'axios'

const REQUEST_TIMEOUT = 30000 // 30 seconds

// Internal API Client
export const apiClient = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

// Response Interceptor: Handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    console.error(`[API Error] ${status || 'Network Error'}:`, error.message)
    return Promise.reject(error)
  }
)

// External API Client (for third-party services)
export const externalApiClient = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

externalApiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

externalApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[External API Error]', error.message)
    return Promise.reject(error)
  }
)
