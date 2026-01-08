# Traversium Tenant Management

Admin panel for managing tenants and viewing tenant metrics.

## Features

- Create new tenants with dedicated schemas
- Create admin accounts for each tenant
- View tenant metrics and reports
- Cost calculations and analytics

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root of this directory with the following variables:
```bash
# Tenant Service API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# Report Service API URL
NEXT_PUBLIC_REPORT_API_BASE_URL=http://localhost:8081
```

For production, update these URLs to your actual service endpoints (e.g., `https://tenant-service.traversium.com`).

3. Run the development server:
```bash
npm run dev
```

## Pages

- `/` - Tenant management dashboard (create and list tenants)
- `/admin` - Tenant admin dashboard (view metrics and reports)

## API Endpoints

### Tenant Service (port 8085)
- `POST /rest/v1/tenants` - Create a new tenant
- `GET /rest/v1/tenants` - List all tenants
- `GET /rest/v1/tenants/{tenantId}` - Get tenant by ID

### Report Service (port 8084)
- `GET /rest/v1/reports/tenant/{tenantId}` - Get tenant report
- `GET /rest/v1/reports/current-tenant` - Get current tenant report

