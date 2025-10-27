import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function handler(req: any, res: any) {
  const payload = await getPayload({ config })
  
  if (req.method === 'GET') {
    return payload.requestHandler(req, res)
  }
  
  if (req.method === 'POST') {
    return payload.requestHandler(req, res)
  }
  
  if (req.method === 'PUT') {
    return payload.requestHandler(req, res)
  }
  
  if (req.method === 'DELETE') {
    return payload.requestHandler(req, res)
  }
  
  if (req.method === 'PATCH') {
    return payload.requestHandler(req, res)
  }
  
  res.status(405).json({ error: 'Method not allowed' })
}
