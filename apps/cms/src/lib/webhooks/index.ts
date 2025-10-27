// Webhook handlers for Algolia integration
interface WebhookPayload {
  collection: string
  doc: any
  operation: 'create' | 'update' | 'delete'
}

// Stub function for Algolia indexing
async function indexToAlgolia(collection: string, doc: any, operation: 'create' | 'update' | 'delete') {
  try {
    // This is a stub - replace with actual Algolia integration
    console.log(`🔍 Algolia ${operation}:`, {
      collection,
      id: doc.id,
      title: doc.title || doc.name,
      status: doc.status,
    })

    // Example Algolia integration (commented out):
    /*
    const algoliasearch = require('algoliasearch')
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
    const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME || 'kawthar')

    const searchableDoc = {
      objectID: doc.id,
      collection,
      title: doc.title || doc.name,
      description: doc.description,
      status: doc.status,
      published: doc.status === 'published',
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }

    switch (operation) {
      case 'create':
      case 'update':
        await index.saveObject(searchableDoc)
        break
      case 'delete':
        await index.deleteObject(doc.id)
        break
    }
    */

    return true
  } catch (error) {
    console.error('❌ Algolia indexing failed:', error)
    return false
  }
}

// Webhook handler for content changes
export async function handleContentWebhook(payload: WebhookPayload) {
  const { collection, doc, operation } = payload

  // Only index published content
  if (doc.status && doc.status !== 'published') {
    console.log(`⏭️ Skipping ${operation} for unpublished ${collection}:`, doc.id)
    return
  }

  // Index to Algolia
  await indexToAlgolia(collection, doc, operation)

  // Trigger frontend revalidation
  await triggerFrontendRevalidation(collection, doc)
}

// Trigger frontend revalidation
async function triggerFrontendRevalidation(collection: string, doc: any) {
  try {
    const frontendUrl = process.env.PUBLIC_SITE_ORIGIN || 'https://kawthar.app'
    const revalidateSecret = process.env.REVALIDATE_SECRET

    if (!revalidateSecret) {
      console.log('⚠️ REVALIDATE_SECRET not set, skipping frontend revalidation')
      return
    }

    // Determine which paths to revalidate based on collection
    const pathsToRevalidate = getPathsToRevalidate(collection, doc)

    for (const path of pathsToRevalidate) {
      const revalidateUrl = `${frontendUrl}/api/revalidate?secret=${revalidateSecret}&path=${path}`
      
      const response = await fetch(revalidateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        console.log(`✅ Revalidated path: ${path}`)
      } else {
        console.error(`❌ Failed to revalidate path: ${path}`, response.statusText)
      }
    }
  } catch (error) {
    console.error('❌ Frontend revalidation failed:', error)
  }
}

// Determine which paths to revalidate based on collection and document
function getPathsToRevalidate(collection: string, doc: any): string[] {
  const paths: string[] = []

  switch (collection) {
    case 'events':
      paths.push('/events')
      if (doc.slug) {
        paths.push(`/events/${doc.slug}`)
      }
      if (doc.organization) {
        paths.push(`/orgs/${doc.organization.slug || doc.organization}`)
      }
      break

    case 'organizations':
      paths.push('/orgs')
      if (doc.slug) {
        paths.push(`/orgs/${doc.slug}`)
      }
      break

    case 'merchants':
      paths.push('/market')
      if (doc.slug) {
        paths.push(`/market/${doc.slug}`)
      }
      break

    case 'products':
      if (doc.merchant) {
        paths.push(`/market/${doc.merchant.slug || doc.merchant}`)
      }
      break

    case 'coupons':
      paths.push('/market')
      break

    case 'meetups':
      paths.push('/meet')
      break

    default:
      // For other collections, revalidate the home page
      paths.push('/')
  }

  return paths
}

// Export webhook handlers for Payload CMS
export const webhookHandlers = {
  afterCreate: async ({ collection, doc }: { collection: string; doc: any }) => {
    await handleContentWebhook({
      collection,
      doc,
      operation: 'create',
    })
  },

  afterUpdate: async ({ collection, doc }: { collection: string; doc: any }) => {
    await handleContentWebhook({
      collection,
      doc,
      operation: 'update',
    })
  },

  afterDelete: async ({ collection, doc }: { collection: string; doc: any }) => {
    await handleContentWebhook({
      collection,
      doc,
      operation: 'delete',
    })
  },
}
