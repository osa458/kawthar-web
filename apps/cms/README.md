# Kawthar CMS

A headless CMS built with Payload CMS v2 for managing Kawthar's content.

## Features

- **Collections**: Organizations, Events, Recurrences, Merchants, Products, Coupons, Meetups, Verifications, AbuseReports, Users, Roles
- **Access Control**: Role-based access control with public read access for published content
- **Media Storage**: S3-compatible storage via DigitalOcean Spaces
- **Admin Interface**: Accessible at `/admin`
- **CORS/CSRF**: Restricted to `https://kawthar.app` and `https://cms.kawthar.app`

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://...

# Payload
PAYLOAD_SECRET=your-secret-key

# S3 Storage (DigitalOcean Spaces)
S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key

# URLs
ADMIN_URL=https://cms.kawthar.app
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Seed database
npm run seed
```

## Production

```bash
# Build
npm run build

# Start
npm start
```

## Docker

```bash
# Build image
docker build -t kawthar-cms .

# Run container
docker run -p 3000:3000 kawthar-cms
```

## Deployment

Deploy to DigitalOcean App Platform:

1. Create a new App
2. Connect your GitHub repository
3. Set source directory to `apps/cms`
4. Configure environment variables
5. Deploy

## API

The CMS provides REST and GraphQL APIs:

- REST API: `https://cms.kawthar.app/api`
- GraphQL API: `https://cms.kawthar.app/api/graphql`
- Admin Interface: `https://cms.kawthar.app/admin`

## Collections

### Users
- Email, password, name, role
- Roles: admin, moderator, organizer, merchant, user

### Organizations
- Name, description, image, website, status
- Public read access for published items

### Events
- Title, description, date, time, location, image, organization, status
- Public read access for published items

### Merchants
- Name, description, category, image, website, status
- Public read access for published items

### Products
- Name, description, price, image, merchant, status
- Public read access for published items

### Coupons
- Code, description, discount type/value, validity, usage limits, merchant
- Public read access

### Meetups
- Title, description, date, time, location, max attendees, organizer, status
- Public read access

### Verifications
- Type, entity ID, status, verified by, notes
- Admin/moderator access only

### Abuse Reports
- Type, description, reported entity, reporter email, status, resolution
- Public create access, admin/moderator read/update access

### Roles
- Name, description, permissions
- Admin access only

### Recurrences
- Name, description, event, frequency, interval, dates, status
- Public read access