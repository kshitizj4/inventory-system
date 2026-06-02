# Deployment Information

## Live URLs

### Frontend
- **URL**: https://your-frontend-url.com
- **Platform**: Vercel (or Netlify)
- **Status**: ✅ Live

### Backend API
- **URL**: https://your-backend-api.com
- **API Docs**: https://your-backend-api.com/docs
- **Platform**: Render (or Railway/Fly.io)
- **Status**: ✅ Live

### Database
- **Type**: PostgreSQL 16
- **Provider**: Render PostgreSQL
- **Status**: ✅ Live

## Repository

- **GitHub**: https://github.com/YOUR_USERNAME/inventory-system
- **Branch**: main
- **Visibility**: Public

## Docker Images

- **Backend Image**: https://hub.docker.com/r/YOUR_USERNAME/inventory-backend
- **Image Tag**: `YOUR_USERNAME/inventory-backend:latest`
- **Base Image**: python:3.12-slim

## How to Use Live System

### 1. Access the Application
Open in your browser:
```
https://your-frontend-url.com
```

### 2. Test All Features

**Products**
- Navigate to Products page
- Click "+ Add Product"
- Fill in: Name, SKU, Price, Quantity
- Click Create
- Edit and Delete work from the table

**Customers**
- Go to Customers page
- Add a customer with name, email, phone
- View and delete customers

**Orders**
- Go to Orders page
- Create an order:
  - Select a customer
  - Add products with quantities
  - System auto-calculates total
  - Click "Place Order"
- Stock quantities automatically decrease
- Cancel orders to restore stock

**Dashboard**
- View total products, customers, orders
- See low stock items (≤10 units)

### 3. Test Backend API Directly
Go to: `https://your-backend-api.com/docs`
- Interactive Swagger UI
- Try out all endpoints
- See request/response schemas

## Deployment Configuration

### Backend Environment Variables
```
DATABASE_URL=postgresql://...
ALLOWED_ORIGINS=https://your-frontend-url.com
```

### Frontend Build Variables
```
VITE_API_URL=https://your-backend-api.com
```

## Verification Checklist

- ✅ Frontend loads without errors
- ✅ Can create products
- ✅ Can create customers
- ✅ Can create orders
- ✅ Stock decreases on order
- ✅ Stock restores on cancel
- ✅ API docs accessible
- ✅ Dashboard shows stats

## Local Testing (Optional)

To test locally before deployment:

```bash
cd inventory-system
copy .env.example .env
docker compose up --build
```

Then access:
- Frontend: http://localhost
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

---

**Deployment Date**: [Today's Date]
**Last Updated**: [Today's Date]
