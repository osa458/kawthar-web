import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function handler(req: any, res: any) {
  try {
    const payload = await getPayload({ config })
    return payload.requestHandler(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
