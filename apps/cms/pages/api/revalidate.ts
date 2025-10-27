import { NextApiRequest, NextApiResponse } from 'next'
import { revalidatePath, revalidateTag } from 'next/cache'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.headers.authorization?.split(' ')[1]
  const expectedSecret = process.env.REVALIDATE_SECRET

  if (secret !== expectedSecret) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  const { type, id } = req.body

  if (type === 'event' && id) {
    revalidateTag(`events-${id}`)
    revalidatePath(`/events/${id}`)
    return res.json({ revalidated: true, now: Date.now() })
  }
  if (type === 'organization' && id) {
    revalidateTag(`organizations-${id}`)
    revalidatePath(`/orgs/${id}`)
    return res.json({ revalidated: true, now: Date.now() })
  }

  return res.json({ revalidated: false, now: Date.now() })
}
