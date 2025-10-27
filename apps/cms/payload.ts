import { getPayload } from 'payload'
import config from './payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null }
}

export const getPayloadClient = async () => {
  if (cached.client) {
    return cached.client
  }

  cached.client = await getPayload({ config })

  return cached.client
}
