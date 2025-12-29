import { NetworkRepository } from './network-repository'
import { apiClient, externalApiClient } from './client'

class AxiosNetworkRepository extends NetworkRepository {
  constructor(axiosInstance) {
    super()
    this.client = axiosInstance
  }

  async get(url, config = {}) {
    try {
      const response = await this.client.get(url, config)
      return this._normalizeResponse(response)
    } catch (error) {
      throw this._normalizeError(error)
    }
  }

  async post(url, data, config = {}) {
    try {
      const response = await this.client.post(url, data, config)
      return this._normalizeResponse(response)
    } catch (error) {
      throw this._normalizeError(error)
    }
  }

  async put(url, data, config = {}) {
    try {
      const response = await this.client.put(url, data, config)
      return this._normalizeResponse(response)
    } catch (error) {
      throw this._normalizeError(error)
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await this.client.delete(url, config)
      return this._normalizeResponse(response)
    } catch (error) {
      throw this._normalizeError(error)
    }
  }

  async patch(url, data, config = {}) {
    try {
      const response = await this.client.patch(url, data, config)
      return this._normalizeResponse(response)
    } catch (error) {
      throw this._normalizeError(error)
    }
  }

  _normalizeResponse(axiosResponse) {
    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
      statusText: axiosResponse.statusText,
      headers: axiosResponse.headers,
    }
  }

  _normalizeError(axiosError) {
    const error = new Error(axiosError.message)
    error.status = axiosError.response?.status
    error.statusText = axiosError.response?.statusText
    error.data = axiosError.response?.data
    error.originalError = axiosError
    return error
  }
}

const internalNetworkRepository = new AxiosNetworkRepository(apiClient)
const externalNetworkRepository = new AxiosNetworkRepository(externalApiClient)

export { internalNetworkRepository, externalNetworkRepository }
