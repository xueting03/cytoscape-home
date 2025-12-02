/**
 * @typedef {Object} RequestConfig
 * @property {Object} [headers]
 * @property {number} [timeout]
 * @property {Object} [params]
 */

/**
 * @typedef {Object} NetworkResponse
 * @property {*} data
 * @property {number} status
 * @property {string} statusText
 * @property {Object} headers
 */

export class NetworkRepository {
  async get(url, config = {}) {
    throw new Error('Method not implemented');
  }

  async post(url, data, config = {}) {
    throw new Error('Method not implemented');
  }

  async put(url, data, config = {}) {
    throw new Error('Method not implemented');
  }

  async delete(url, config = {}) {
    throw new Error('Method not implemented');
  }

  async patch(url, data, config = {}) {
    throw new Error('Method not implemented');
  }
}