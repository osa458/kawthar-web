import { getPayloadInstance } from '../../payload'

export default async function AdminPage() {
  const payload = await getPayloadInstance()
  return payload.renderAdmin()
}