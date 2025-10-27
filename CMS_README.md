# Kawthar Web - Headless CMS Admin System

A production-ready Next.js 14 application with a complete headless CMS admin system for managing events, merchants, and organizations.

## 🚀 **CMS Features**

### **Admin Dashboard**
- **Authentication**: Secure login with NextAuth.js
- **Dashboard**: Overview with statistics and management tabs
- **Content Management**: Full CRUD operations for all content types
- **Media Management**: File upload and management system
- **User Management**: Role-based access control

### **Headless Architecture**
- **API-First**: Complete REST API for all content types
- **Database**: SQLite with Prisma ORM (easily switchable to PostgreSQL/MySQL)
- **Authentication**: JWT-based session management
- **File Storage**: Local file system (easily extendable to cloud storage)

## 🛠 **Setup Instructions**

### **1. Install Dependencies**
```bash
pnpm install
```

### **2. Set Up Database**
```bash
# Generate Prisma client
pnpm run db:generate

# Push database schema
pnpm run db:push

# Seed database with sample data and admin user
pnpm run db:seed
```

### **3. Start Development Server**
```bash
pnpm dev
```

### **4. Access Admin Panel**
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@kawthar.app`
- **Password**: `admin123`

## 📊 **Database Schema**

### **Users**
- Admin authentication and role management
- Password hashing with bcryptjs
- Role-based permissions (ADMIN, EDITOR, VIEWER)

### **Events**
- Complete event management
- Slug generation for SEO-friendly URLs
- Publishing control
- Rich metadata (location, pricing, capacity, etc.)

### **Merchants**
- Merchant profile management
- Rating and review system
- Featured merchant functionality
- Contact information and hours

### **Organizations**
- Organization profiles
- Event association capabilities
- Website and contact management

### **Media Files**
- File upload tracking
- MIME type validation
- Size management
- URL generation

## 🔌 **API Endpoints**

### **Public API (Frontend)**
- `GET /api/events` - Get published events with filtering
- `GET /api/merchants` - Get published merchants with filtering
- `GET /api/organizations` - Get published organizations

### **Admin API (CMS)**
- `GET /api/admin/events` - Get all events (admin only)
- `POST /api/admin/events` - Create new event (admin only)
- `PUT /api/admin/events/[id]` - Update event (admin only)
- `DELETE /api/admin/events/[id]` - Delete event (admin only)

Similar endpoints exist for merchants and organizations.

## 🎨 **Admin Interface**

### **Dashboard Features**
- **Statistics**: Real-time counts of events, merchants, organizations
- **Quick Actions**: Add new content with one click
- **Tabbed Interface**: Organized content management
- **Responsive Design**: Works on desktop and mobile

### **Content Management**
- **Rich Forms**: Comprehensive input fields for all data
- **Image Upload**: Drag-and-drop file uploads
- **Slug Generation**: Automatic SEO-friendly URL creation
- **Publishing Control**: Draft/published status management
- **Validation**: Client and server-side validation

## 🔒 **Security Features**

### **Authentication**
- **NextAuth.js**: Industry-standard authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: JWT-based sessions
- **Route Protection**: Admin routes require authentication

### **Authorization**
- **Role-Based Access**: Different permission levels
- **API Protection**: All admin endpoints require authentication
- **CSRF Protection**: Built-in NextAuth.js protection
- **Input Validation**: Comprehensive data validation

## 📁 **File Structure**

```
src/
├── app/
│   ├── admin/                 # Admin panel pages
│   │   ├── login/           # Authentication
│   │   ├── page.tsx         # Dashboard
│   │   └── [content]/       # Content management pages
│   ├── api/
│   │   ├── auth/            # NextAuth.js endpoints
│   │   ├── admin/           # Admin API endpoints
│   │   └── [content]/       # Public API endpoints
│   └── [pages]/             # Public website pages
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── AuthProvider.tsx     # Authentication context
├── lib/
│   ├── auth.ts              # NextAuth.js configuration
│   ├── prisma.ts            # Database client
│   └── utils.ts             # Utility functions
└── prisma/
    └── schema.prisma        # Database schema
```

## 🚀 **Deployment**

### **Environment Variables**
```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
ADMIN_EMAIL="admin@your-domain.com"
ADMIN_PASSWORD="secure-password"
```

### **Database Setup**
1. **Production Database**: Use PostgreSQL or MySQL for production
2. **Run Migrations**: `pnpm run db:push`
3. **Seed Data**: `pnpm run db:seed`

### **File Storage**
- **Development**: Local file system
- **Production**: Configure cloud storage (AWS S3, Cloudinary, etc.)

## 🔧 **Customization**

### **Adding New Content Types**
1. **Update Schema**: Add new model to `prisma/schema.prisma`
2. **Create API Routes**: Add CRUD endpoints in `/api/admin/`
3. **Create Admin Pages**: Add management interface
4. **Update Dashboard**: Add new tab and statistics

### **Extending Authentication**
- **OAuth Providers**: Add Google, GitHub, etc.
- **User Registration**: Implement signup flow
- **Password Reset**: Add password recovery
- **Email Verification**: Add email confirmation

## 📈 **Performance**

### **Optimizations**
- **Database Indexing**: Optimized queries with Prisma
- **Image Optimization**: Next.js Image component
- **Caching**: API response caching
- **Pagination**: Large dataset handling

### **Monitoring**
- **Error Tracking**: Built-in error handling
- **Performance Metrics**: Next.js analytics
- **Database Monitoring**: Prisma query logging

## 🎯 **Next Steps**

1. **File Upload**: Implement cloud storage integration
2. **Rich Text Editor**: Add WYSIWYG content editing
3. **Bulk Operations**: Mass import/export functionality
4. **Advanced Filtering**: Complex search and filter options
5. **Analytics**: Content performance tracking
6. **Multi-language**: Internationalization support

---

**Your Kawthar CMS is now ready for production use!** 🎉
