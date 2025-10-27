import { getPayload } from 'payload'
import config from '../../payload.config'
import { NextRequest } from 'next/server'

const payload = await getPayload({ config })

export async function GET(request: NextRequest) {
  return payload.requestHandler(request)
}

export async function POST(request: NextRequest) {
  return payload.requestHandler(request)
}

export async function PUT(request: NextRequest) {
  return payload.requestHandler(request)
}

export async function DELETE(request: NextRequest) {
  return payload.requestHandler(request)
}

export async function PATCH(request: NextRequest) {
  return payload.requestHandler(request)
}
