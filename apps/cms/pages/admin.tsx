import { getPayload } from 'payload'
import config from '../payload.config'

export default async function AdminPage() {
  const payload = await getPayload({ config })
  return payload.renderAdmin()
}
