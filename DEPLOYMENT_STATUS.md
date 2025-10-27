# Kawthar - Complete Headless CMS Architecture

## 🏗️ **System Architecture**

### **Strict Separation:**
- **CMS Admin**: `cms.kawthar.app` - Payload CMS with PostgreSQL
- **Frontend**: `kawthar.app` - Next.js 14 consuming CMS API (read-only)
- **Database**: DigitalOcean Managed PostgreSQL
- **Storage**: DigitalOcean Spaces (S3-compatible)

### **Infrastructure:**
1. **Managed PostgreSQL**: `kawthar-cms-db`
2. **Spaces Bucket**: `kawthar-cms-media`
3. **CMS App**: Node 20, Payload CMS
4. **Frontend App**: Next.js 14, TypeScript

---

## 🚀 **Deployment Status**

### **✅ CMS Deployment**
- **URL**: https://sea-lion-app-5wqrx.ondigitalocean.app
- **Admin**: https://sea-lion-app-5wqrx.ondigitalocean.app/admin
- **Status**: LIVE AND HEALTHY
- **Database**: Connected to PostgreSQL
- **Storage**: Connected to DigitalOcean Spaces

### **✅ Frontend Deployment**
- **URL**: https://king-prawn-app-cqmnl.ondigitalocean.app
- **Custom Domain**: kawthar.app (configuring)
- **Status**: LIVE
- **CMS Connection**: Configured

### **⏳ DNS Propagation**
- `kawthar.app` - Configuring (DNS propagating)
- `www.kawthar.app` - Configuring (DNS propagating)
- `cms.kawthar.app` - Not added yet

---

## 📦 **CMS Collections**

### **Content Collections:**
1. **Organizations** - Community organizations and groups
2. **Events** - Cultural events, workshops, gatherings
3. **Merchants** - Local businesses and vendors
4. **Products** - Merchant products and services
5. **Coupons** - Discount codes and promotions
6. **Meetups** - Community meetups and networking

### **System Collections:**
7. **Verifications** - Content verification and approval
8. **AbuseReports** - Content moderation and safety
9. **Users** - Admin users with authentication

### **Access Control:**
- **Public READ**: Published content accessible via API
- **WRITE**: Restricted to authenticated users
- **Roles**: Admin, Moderator, Organizer, Merchant

---

## 🔌 **API Integration**

### **Frontend SDK** (`src/lib/cms.ts`)
```typescript
import { cms } from '@/lib/cms'

// Get published events
const events = await cms.getEvents({ 
  where: { status: { equals: 'published' } } 
})

// Get event by slug
const event = await cms.getEventBySlug('ramadan-iftar')

// Search events
const results = await cms.searchEvents('cooking')
```

### **Environment Variables:**

**CMS App:**
```env
NODE_ENV=production
PAYLOAD_SECRET=kawthar-cms-secret-key-2024-production-32chars
DATABASE_URL=postgresql://doadmin:***@kawthar-cms-db-***
S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
S3_BUCKET=kawthar-cms-media
S3_ACCESS_KEY_ID=DO00BMLYU999QDDCB7LG
S3_SECRET_ACCESS_KEY=***
ADMIN_URL=https://cms.kawthar.app
PUBLIC_SITE_ORIGIN=https://kawthar.app
REVALIDATE_SECRET=kawthar-revalidation-secret-2024
```

**Frontend App:**
```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
CMS_BASE_URL=https://sea-lion-app-5wqrx.ondigitalocean.app
CMS_API_TOKEN=temp-token-will-generate-after-cms-setup
REVALIDATE_SECRET=kawthar-revalidation-secret-2024
```

---

## 🔄 **Revalidation Webhook**

### **Frontend Endpoint:** `/api/revalidate`
```typescript
// Payload CMS calls this to refresh frontend after content updates
POST /api/revalidate
Headers: { 'x-revalidate-secret': 'kawthar-revalidation-secret-2024' }
Body: { path: '/events' } or { tag: 'events' }
```

### **Webhook Flow:**
1. Content updated in CMS
2. Payload webhook triggers
3. Frontend revalidates affected pages
4. Users see updated content

---

## 🔒 **Security Features**

### **CORS & CSRF:**
- Allowlist: `https://kawthar.app`, `https://www.kawthar.app`, `https://cms.kawthar.app`
- All other origins blocked

### **Access Control:**
- **Public**: Read published content only
- **Authenticated**: Create/update own content
- **Admin**: Full CRUD access
- **Moderator**: Review and approve content

### **API Authentication:**
- Server-to-server: Bearer token
- Admin panel: Email/password
- Webhook: Secret header verification

---

## 🎯 **Next Steps**

### **1. Complete CMS Setup:**
```bash
# Access CMS admin
https://sea-lion-app-5wqrx.ondigitalocean.app/admin

# Create first admin user
Email: admin@kawthar.app
Password: (your secure password)

# Add sample content
- 1 Organization
- 3 Events
- 2 Merchants
```

### **2. Generate API Token:**
```bash
# In Payload admin
Settings → API Keys → Generate New Key
Name: frontend-read-only
Permissions: Read only
Copy token and update frontend CMS_API_TOKEN env var
```

### **3. Add Custom Domain:**
```bash
# In DigitalOcean CMS App
Settings → Domains → Add Domain
Domain: cms.kawthar.app

# Configure DNS
Add CNAME: cms → target provided by DigitalOcean
```

### **4. Test Integration:**
```bash
# Create an event in CMS
# Check it appears on kawthar.app/events
# Verify revalidation works
```

---

## 📊 **Current Status:**

✅ **Infrastructure**: Postgres + Spaces provisioned
✅ **CMS**: Deployed and healthy
✅ **Frontend**: Deployed with CMS integration
✅ **Collections**: All 9 collections configured
✅ **RBAC**: Role-based access control implemented
✅ **API**: RESTful endpoints working
✅ **Revalidation**: Webhook endpoint ready
⏳ **DNS**: kawthar.app propagating (1-2 hours)
⏳ **CMS Domain**: cms.kawthar.app needs to be added
⏳ **API Token**: Needs generation after first login
⏳ **Content**: Needs to be added via admin

---

## 🎉 **You're Almost Done!**

**What works NOW:**
- ✅ CMS admin at temp URL
- ✅ Frontend at temp URL
- ✅ Database connectivity
- ✅ File storage
- ✅ API integration configured

**What's pending:**
- ⏳ DNS propagation (automatic, just wait)
- ⏳ First admin user creation (manual)
- ⏳ API token generation (after login)
- ⏳ Content creation (via admin)

---

Built with ❤️ for Kawthar - Abundance, verified.
