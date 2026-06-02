# Inventory & Order Management System

A production-ready full-stack application for managing products, customers, and orders with real-time inventory tracking.

## 🚀 Features

- **Product Management**: Create, read, update, delete products with SKU tracking
- **Customer Management**: Manage customer information with unique email validation
- **Order Management**: Create orders with automatic stock deduction and restoration on cancellation
- **Dashboard**: Real-time stats and low-stock alerts
- **Responsive UI**: Built with React and modern CSS
- **Production Ready**: Fully containerized with Docker
- **API Documentation**: Interactive Swagger/OpenAPI docs

## 📋 Tech Stack

### Backend
- **Python 3.12**
- **FastAPI** - Modern async web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Production database
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy & static file serving
- **GitHub** - Version control

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│                Frontend (React)              │
│  http://localhost or deployed URL           │
└────────────────┬────────────────────────────┘
                 │ API calls (http://localhost:8000)
┌────────────────▼────────────────────────────┐
│              Backend (FastAPI)               │
│  http://localhost:8000 or deployed URL      │
└────────────────┬────────────────────────────┘
                 │ SQL queries
┌────────────────▼────────────────────────────┐
│          Database (PostgreSQL)               │
│        postgresql://localhost:5432           │
└─────────────────────────────────────────────┘
```

## 📦 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git (for cloning)

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/inventory-system.git
cd inventory-system

# Copy environment variables
copy .env.example .env

# Start all services
docker compose up --build

# Services will be available at:
# - Frontend: http://localhost
# - Backend API: http://localhost:8000
# - API Docs: http://localhost:8000/docs
# - Database: localhost:5432
```

### Stopping Services

```bash
docker compose down          # Stop containers
docker compose down -v       # Stop and remove volumes (reset database)
```

## 📚 API Endpoints

### Products
- `GET /products` - List all products
- `POST /products` - Create product
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Customers
- `GET /customers` - List all customers
- `POST /customers` - Create customer
- `GET /customers/{id}` - Get customer details
- `DELETE /customers/{id}` - Delete customer

### Orders
- `GET /orders` - List all orders
- `POST /orders` - Create order
- `GET /orders/{id}` - Get order details
- `DELETE /orders/{id}` - Cancel order (restores stock)

### Dashboard
- `GET /dashboard` - Get dashboard statistics
- `GET /health` - Health check

**Full API Documentation**: Access `/docs` on the backend URL

## 🔒 Business Logic

| Rule | Implementation |
|------|-----------------|
| Unique SKU | Database constraint + duplicate check |
| Unique Email | Database constraint + duplicate check |
| Non-negative values | Pydantic validators + DB CHECK constraints |
| Insufficient stock blocked | `with_for_update()` row-level locking |
| Automatic stock deduction | Atomic transaction on order creation |
| Stock restoration on cancel | Restore on order deletion |
| Auto-calculated total | Backend computation |

## 🐳 Docker Configuration

### Services

**Database (PostgreSQL 16-alpine)**
- Port: 5432
- Volume: `postgres_data` (persistent)
- Health check: Every 10s

**Backend (Python 3.12-slim)**
- Port: 8000
- Non-root user: `app`
- Uvicorn server

**Frontend (Node 20-alpine → Nginx 1.27-alpine)**
- Port: 80
- Multi-stage build (smaller final image)
- SPA fallback routing

## 🌍 Deployment

### Backend Deployment (Render)

1. **Create Render account** at https://render.com
2. **New Web Service** → Connect GitHub repo
3. **Build command**: `pip install -r requirements.txt`
4. **Start command**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
5. **Environment variables**:
   ```
   DATABASE_URL=postgresql://user:pass@your-postgres-url/dbname
   ALLOWED_ORIGINS=https://your-frontend-url.com
   ```

### Frontend Deployment (Vercel)

1. **Go to** https://vercel.com
2. **Import Git Repository** → Select your repo
3. **Framework Preset**: Vite
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```

### Alternative Backend Platforms
- **Railway**: https://railway.app
- **Fly.io**: https://fly.io

### Alternative Frontend Platforms
- **Netlify**: https://netlify.com

## 📖 Project Structure

```
inventory-system/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app, CORS, routes
│   │   ├── config.py         # Settings
│   │   ├── database.py       # SQLAlchemy setup
│   │   ├── models.py         # Database models
│   │   ├── schemas.py        # Pydantic schemas
│   │   └── routers/
│   │       ├── products.py   # Product endpoints
│   │       ├── customers.py  # Customer endpoints
│   │       └── orders.py     # Order endpoints
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .dockerignore
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main component
│   │   ├── main.jsx          # Entry point
│   │   ├── api/
│   │   │   └── client.js     # Axios client
│   │   ├── components/
│   │   │   └── Layout.jsx    # Main layout
│   │   └── pages/
│   │       ├── Dashboard.jsx
│   │       ├── Products.jsx
│   │       ├── Customers.jsx
│   │       └── Orders.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
├── docker-compose.yml        # Local development
├── docker-compose.prod.yml   # Production overrides
├── .env.example
├── .gitignore
└── README.md
```

## 🔧 Environment Variables

Create `.env` file (copy from `.env.example`):

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=changeme
POSTGRES_DB=inventory

# Backend
DATABASE_URL=postgresql://postgres:changeme@db:5432/inventory
ALLOWED_ORIGINS=http://localhost,http://localhost:80

# Frontend
VITE_API_URL=http://localhost:8000
```

## 🧪 Testing the System

### Via Frontend UI
1. Navigate to **Products** → Add a few products
2. Go to **Customers** → Add customers
3. Go to **Orders** → Create an order
4. Check **Dashboard** for updated stats

### Via API (Swagger)
1. Visit http://localhost:8000/docs
2. Try out endpoints with "Try it out" button

### Command Line (curl)
```bash
# Create product
curl -X POST http://localhost:8000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "sku": "LAPTOP-001",
    "price": 999.99,
    "quantity": 10
  }'

# Get dashboard stats
curl http://localhost:8000/dashboard
```

## 📊 Database Schema

### Products
- `id` (PK)
- `name` (String, required)
- `sku` (String, unique, required)
- `price` (Float, non-negative)
- `quantity` (Integer, non-negative)
- `description` (Text, optional)
- `created_at`, `updated_at` (Timestamp)

### Customers
- `id` (PK)
- `full_name` (String, required)
- `email` (String, unique, required)
- `phone` (String, optional)
- `created_at` (Timestamp)

### Orders
- `id` (PK)
- `customer_id` (FK, required)
- `total_amount` (Float)
- `status` (String, default: "pending")
- `created_at` (Timestamp)

### OrderItems
- `id` (PK)
- `order_id` (FK, required)
- `product_id` (FK, required)
- `quantity` (Integer, positive)
- `unit_price` (Float)

## 🚨 Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No content (deletion)
- `400` - Bad request (validation, insufficient stock)
- `404` - Not found
- `409` - Conflict (duplicate SKU/email)
- `500` - Server error

## 🔐 Security Features

- ✅ Non-root Docker containers
- ✅ CORS enabled for safe cross-origin requests
- ✅ Input validation on all endpoints
- ✅ SQL injection protected (SQLAlchemy ORM)
- ✅ Nginx security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Environment variables for sensitive data
- ✅ Row-level locking for race condition prevention

## 📝 Development Tips

### Adding a New Endpoint
1. Add model in `backend/app/models.py`
2. Add schema in `backend/app/schemas.py`
3. Create router in `backend/app/routers/new_router.py`
4. Import router in `backend/app/main.py`

### Updating Frontend
1. Edit component in `frontend/src/pages/` or `frontend/src/components/`
2. Changes reflect immediately in dev server (hot reload)
3. Build for production: `npm run build`

### Database Migrations
For advanced migrations, use Alembic:
```bash
# Inside backend container
alembic revision --autogenerate -m "Add new column"
alembic upgrade head
```

## 🐛 Troubleshooting

### Database connection failed
- Ensure PostgreSQL container is healthy: `docker compose ps`
- Check DATABASE_URL in .env

### API not responding
- Verify backend container is running: `docker compose logs backend`
- Check ALLOWED_ORIGINS includes your frontend URL

### Frontend not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Verify VITE_API_URL points to correct backend

### Port already in use
```bash
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill process (Windows)
taskkill /PID <PID> /F
```

## 📄 License

MIT License - feel free to use for educational purposes.

## 👨‍💻 Author

Created as a technical assessment for full-stack development.

---

**Ready to deploy?** See deployment instructions above for Render, Railway, Vercel, or Netlify.
