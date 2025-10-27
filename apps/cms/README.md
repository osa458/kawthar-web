# Kawthar Headless CMS - Payload CMS

A professional headless CMS built with Payload CMS v3, TypeScript, and PostgreSQL for managing Kawthar's content.

## 🏗️ **Architecture**

### **Strict Separation**
- **CMS Admin**: `cms.kawthar.app` (private login, RBAC)
- **Frontend**: `kawthar.app` (read-only via CMS API)
- **Database**: PostgreSQL with Payload ORM
- **Authentication**: Role-based access control

### **Collections**
- **Organizations**: Community organizations and groups
- **Events**: Cultural events, workshops, gatherings
- **Merchants**: Local businesses and vendors
- **Products**: Merchant products and services
- **Coupons**: Discount codes and promotions
- **Meetups**: Community meetups and networking
- **Verifications**: Content verification and approval
- **Users**: Admin users with role-based permissions
- **Media**: File uploads and media management

## 🚀 **Setup Instructions**

### **1. Install Dependencies**
```bash
cd apps/cms
npm install
```

### **2. Environment Configuration**
Copy `.env.example` to `.env.local` and configure:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/kawthar_cms"

# Payload CMS
PAYLOAD_SECRET="your-payload-secret-key-change-this-in-production"

# Admin credentials
PAYLOAD_ADMIN_EMAIL="admin@kawthar.app"
PAYLOAD_ADMIN_PASSWORD="admin123"

# CORS origins
CORS_ORIGINS="https://kawthar.app,https://www.kawthar.app"
```

### **3. Database Setup**
```bash
# Create PostgreSQL database
createdb kawthar_cms

# Generate types
npm run generate:types
```

### **4. Start Development Server**
```bash
npm run dev
```

### **5. Access Admin Panel**
- **URL**: `http://localhost:3000/admin`
- **Email**: `admin@kawthar.app`
- **Password**: `admin123`

## 🔐 **Role-Based Access Control**

### **User Roles**
- **Admin**: Full access to all collections
- **Organizer**: Manage events and organizations
- **Merchant**: Manage merchant profiles and products
- **Moderator**: Review and verify content

### **Permissions**
- **Public Read**: Published content accessible via API
- **Write Access**: Limited to authenticated users with appropriate roles
- **Admin Access**: Full CRUD operations for all content

## 🔌 **API Endpoints**

### **REST API**
All collections are accessible via REST API:

- `GET /api/events` - Get published events
- `GET /api/merchants` - Get published merchants
- `GET /api/organizations` - Get published organizations
- `GET /api/products` - Get published products
- `GET /api/coupons` - Get published coupons
- `GET /api/meetups` - Get published meetups

### **Query Parameters**
- `where`: JSON query conditions
- `sort`: Sort field and direction
- `limit`: Number of results per page
- `page`: Page number for pagination

### **Example Queries**
```bash
# Get events by category
GET /api/events?where={"category":{"equals":"religious"}}

# Get featured merchants
GET /api/merchants?where={"featured":{"equals":true}}

# Search events by neighborhood
GET /api/events?where={"neighborhood":{"equals":"Downtown"}}
```

## 🌐 **Frontend Integration**

### **CMS SDK**
The frontend uses a TypeScript SDK (`src/lib/cms.ts`) to consume the CMS API:

```typescript
import { cms } from '@/lib/cms'

// Get all published events
const events = await cms.getEvents()

// Get event by slug
const event = await cms.getEventBySlug('ramadan-iftar-community')

// Search events
const results = await cms.searchEvents('cooking', {
  neighborhood: 'Midtown'
})
```

### **Environment Variables**
```env
# Frontend .env.local
NEXT_PUBLIC_CMS_URL="https://cms.kawthar.app"
CMS_API_KEY="your-api-key-for-server-side-calls"
```

## 🚀 **Deployment**

### **DigitalOcean App Platform**

1. **Create App**
   - Source: GitHub repository
   - Build Command: `npm run build`
   - Run Command: `npm start`

2. **Environment Variables**
   ```env
   DATABASE_URL="postgresql://user:pass@host:5432/db"
   PAYLOAD_SECRET="production-secret-key"
   PAYLOAD_ADMIN_EMAIL="admin@kawthar.app"
   PAYLOAD_ADMIN_PASSWORD="secure-password"
   CORS_ORIGINS="https://kawthar.app,https://www.kawthar.app"
   ```

3. **Database**
   - Use DigitalOcean Managed PostgreSQL
   - Configure connection string in environment variables

4. **Domain**
   - Deploy to `cms.kawthar.app`
   - Configure SSL certificate

### **Docker Deployment**
```bash
# Build image
docker build -t kawthar-cms .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e PAYLOAD_SECRET="..." \
  kawthar-cms
```

## 🔧 **Webhooks & Integrations**

### **Algolia Search Integration**
Webhook stubs are configured for automatic search indexing:

```typescript
// Webhook handler (to be implemented)
export async function onContentUpdate(collection: string, doc: any) {
  // Index content in Algolia
  await algoliaIndex.saveObject({
    objectID: doc.id,
    collection,
    ...doc
  })
}
```

### **Webhook Configuration**
- **URL**: `https://kawthar.app/api/webhooks/cms`
- **Events**: `afterCreate`, `afterUpdate`, `afterDelete`
- **Secret**: Webhook secret for verification

## 📊 **Content Management Features**

### **Rich Text Editor**
- Lexical editor for rich content
- Image embedding
- Link management
- Formatting options

### **Media Management**
- File upload with validation
- Image resizing and optimization
- Alt text management
- CDN integration ready

### **Content Versioning**
- Automatic version tracking
- Draft/published states
- Content scheduling
- Rollback capabilities

### **Audit Logs**
- User action tracking
- Content change history
- Security event logging

## 🔒 **Security Features**

### **Authentication**
- JWT-based sessions
- Password hashing with bcrypt
- Session management
- Logout functionality

### **Authorization**
- Role-based permissions
- Collection-level access control
- Field-level permissions
- API key management

### **CORS & CSRF**
- Restricted CORS origins
- CSRF protection
- API rate limiting
- Input validation

## 📈 **Performance**

### **Optimizations**
- Database indexing
- Query optimization
- Image optimization
- Caching strategies

### **Monitoring**
- Error tracking
- Performance metrics
- Database monitoring
- API response times

## 🎯 **Next Steps**

1. **Deploy CMS**: Set up `cms.kawthar.app`
2. **Configure Database**: PostgreSQL with proper indexing
3. **Set Up Webhooks**: Algolia integration
4. **Content Migration**: Import existing data
5. **User Training**: Admin user onboarding
6. **Monitoring**: Set up logging and alerts

---

**Your professional headless CMS is ready for production!** 🎉

The frontend will consume this API, ensuring complete separation between content management and presentation layers.
