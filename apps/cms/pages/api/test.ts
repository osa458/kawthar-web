// Simple test to see if we can get Payload working
import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function handler(req: any, res: any) {
  try {
    const payload = await getPayload({ config })
    res.json({ success: true, message: 'Payload initialized successfully' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
