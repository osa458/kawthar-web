import { getPayloadClient } from '../../payload'

export async function GET(request: Request) {
  const payload = await getPayloadClient()
  return Response.json({ message: 'Payload CMS API is running' })
}

export async function POST(request: Request) {
  const payload = await getPayloadClient()
  return Response.json({ message: 'Payload CMS API is running' })
}
