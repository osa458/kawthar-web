import { getPayload } from 'payload'
import config from './payload.config'

let payload: any = null

export const getPayloadInstance = async () => {
  if (!payload) {
    payload = await getPayload({ config })
  }
  return payload
}

export default getPayloadInstance
