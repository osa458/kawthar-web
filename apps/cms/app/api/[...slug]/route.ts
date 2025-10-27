import { getPayloadInstance } from '../../../payload'
import config from '../../../payload.config'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.requestHandler(request)
}

export async function POST(request: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.requestHandler(request)
}

export async function PUT(request: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.requestHandler(request)
}

export async function DELETE(request: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.requestHandler(request)
}

export async function PATCH(request: NextRequest) {
  const payload = await getPayloadInstance()
  return payload.requestHandler(request)
}
