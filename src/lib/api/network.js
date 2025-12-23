import { internalNetworkRepository, externalNetworkRepository } from './axios-repository'

// Unified API wrapper for network operations
export const Network = {
  internal: internalNetworkRepository,
  external: externalNetworkRepository,
}

/** @deprecated Use Network.internal instead */
export const api = internalNetworkRepository

/** @deprecated Use Network.external instead */
export const externalApi = externalNetworkRepository