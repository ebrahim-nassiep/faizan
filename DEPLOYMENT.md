# Deployment Guide

## Coolify Deployment

This application can be deployed using Coolify with the following configuration:

### Prerequisites
1. Coolify instance running
2. GitHub repository connected
3. Environment variables configured

### Environment Variables
Set these in your Coolify project:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Database Setup
1. Create a Cloudflare D1 database
2. Run migrations:
   ```bash
   wrangler d1 execute DB --file=./migrations/1.sql
   wrangler d1 execute DB --file=./migrations/2.sql
   wrangler d1 execute DB --file=./migrations/seed-data.sql
   ```

### Deployment Steps
1. Connect your GitHub repository to Coolify
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Configure port: 8080
5. Set environment variables
6. Deploy!

## Local Development

1. Install dependencies: `npm install`
2. Setup environment variables in `.env`
3. Run migrations: `npm run cf-typegen && wrangler d1 migrations apply DB`
4. Seed data: `wrangler d1 execute DB --file=./migrations/seed-data.sql`
5. Start dev server: `npm run dev`

## Build Commands
- `npm run build` - Build for production
- `npm run dev` - Start development server
- `npm run lint` - Run linting
- `npm start` - Start production server