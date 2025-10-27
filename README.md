# Kawthar Web

A production-ready Next.js 14 application built with TypeScript, App Router, Tailwind CSS, and shadcn/ui. Kawthar connects communities through culture, events, markets, and meaningful connections.

## Features

- **Events**: Discover cultural events, workshops, and community gatherings
- **Market**: Explore local merchants, artisans, and authentic products  
- **Meet**: Connect with like-minded individuals and build community
- **Organizations**: Browse seasonal, recurring, and special events by organization
- **Responsive Design**: Mobile-first, RTL-friendly interface
- **Accessibility**: WCAG compliant with semantic landmarks and focus management
- **SEO Optimized**: Metadata, OpenGraph, sitemap, and robots.txt
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: Client-side React state
- **Data**: Mock JSON loaders (ready for API integration)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kawthar-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── events/            # Events pages
│   ├── market/            # Market pages
│   ├── orgs/              # Organization pages
│   ├── about/             # Static pages
│   ├── contact/
│   ├── meet/
│   ├── trust/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── NavBar.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── FilterPane.tsx
│   ├── CardGrid.tsx
│   ├── EventCard.tsx
│   ├── MerchantCard.tsx
│   ├── OrgTabs.tsx
│   └── EmptyState.tsx
├── lib/                  # Utilities and data
│   ├── data/            # Mock data loaders
│   ├── hooks/           # Custom hooks
│   └── utils.ts         # Utility functions
└── globals.css          # Global styles
```

## Routes

- `/` - Home page with hero, search, and feature tiles
- `/events` - Events listing with filters
- `/events/[slug]` - Individual event details
- `/market` - Merchant grid with filters
- `/market/[slug]` - Individual merchant details
- `/meet` - Community connection info page
- `/orgs/[slug]` - Organization page with event tabs
- `/about` - About page
- `/trust` - Trust & safety information
- `/contact` - Contact form and information

## Components

### Core Components
- **NavBar**: Responsive navigation with brand and menu items
- **Footer**: Site footer with links and social media
- **SearchBar**: Global search functionality
- **FilterPane**: Advanced filtering for events and merchants
- **CardGrid**: Responsive grid layout component

### Content Components
- **EventCard**: Event display card with details
- **MerchantCard**: Merchant display card with ratings
- **OrgTabs**: Organization event tabs (Seasonal, Recurring, Special)
- **EmptyState**: Empty state with call-to-action

## Data Layer

The application uses mock data loaders in `/lib/data/events.ts` that simulate API calls. These can be easily replaced with real API endpoints:

- `getEvents()` - Fetch events with optional filters
- `getEventBySlug()` - Fetch single event by slug
- `getMerchants()` - Fetch merchants with optional filters
- `getMerchantBySlug()` - Fetch single merchant by slug
- `getOrganizations()` - Fetch all organizations
- `getOrganizationBySlug()` - Fetch single organization by slug
- `searchEvents()` - Search events by query and filters

## Accessibility Features

- Semantic HTML landmarks (`<nav>`, `<main>`, `<footer>`)
- Skip-to-content link for keyboard navigation
- Focus rings on interactive elements
- ARIA labels and roles
- Screen reader friendly content
- Keyboard navigation support

## SEO Features

- Dynamic metadata for each page
- OpenGraph tags for social sharing
- Dynamic sitemap generation
- Robots.txt configuration
- Structured data ready for implementation

## Telemetry

Placeholder telemetry hooks are included for analytics tracking:

- `usePageView()` - Track page views
- `useSearchFired()` - Track search queries
- `trackEvent()` - Track custom events

## Deployment

### DigitalOcean App Platform

1. **Prepare for deployment**
   ```bash
   npm run build
   npm run typecheck
   ```

2. **Create DigitalOcean App**
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Connect your GitHub repository

3. **Configure build settings**
   ```yaml
   # .do/app.yaml
   name: kawthar-web
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/kawthar-web
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     build_command: npm run build
   ```

4. **Environment Variables** (if needed)
   - Add any required environment variables in the App Platform dashboard

5. **Deploy**
   - Click "Create Resources"
   - Your app will build and deploy automatically

### Alternative Deployment Options

- **Vercel**: Connect GitHub repo, automatic deployments
- **Netlify**: Connect GitHub repo, configure build settings
- **Railway**: Connect GitHub repo, automatic deployments
- **Self-hosted**: Use `npm run build && npm start`

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add any required environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@kawthar.com or create an issue in the repository.

---

Built with ❤️ for the Arabic community