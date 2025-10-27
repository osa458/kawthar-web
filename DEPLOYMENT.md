# DigitalOcean App Platform Configuration
# Use this as reference when setting up your app

## App Configuration
- **Name**: kawthar-web
- **Source**: GitHub (kawthar-web repository)
- **Branch**: master

## Service Configuration
- **Type**: Web Service
- **Runtime**: Node.js 20
- **Source Directory**: / (root)

## Build Settings
- **Build Command**: pnpm install && pnpm build
- **Run Command**: pnpm start

## Environment Variables
- NODE_ENV=production
- NEXT_TELEMETRY_DISABLED=1

## Resources
- **Plan**: Basic (smallest plan)
- **Instance**: Basic-XXS (512MB RAM, 1 vCPU)

## Deployment
- **Auto-deploy**: Enabled on master branch
- **Health Check**: Default (Next.js will respond on $PORT)

## Expected Build Process
1. Install dependencies with pnpm
2. Build Next.js application
3. Start production server
4. Health checks pass

## Troubleshooting
- If build fails, check build logs in DigitalOcean dashboard
- Ensure all environment variables are set
- App will automatically use $PORT environment variable
