# Pre-Submission Checklist

## ✅ Development Complete

- [x] Backend API with FastAPI
- [x] Frontend with React
- [x] PostgreSQL database
- [x] Docker containerization
- [x] Docker Compose setup
- [x] All required endpoints
- [x] Input validation
- [x] Error handling
- [x] Business logic (stock management)
- [x] API documentation (Swagger)

---

## ☐ Pre-Deployment (This Week)

### GitHub Setup
- [ ] Create GitHub account (https://github.com/signup)
- [ ] Create public repository: `inventory-system`
- [ ] Clone locally
- [ ] Push code:
  ```cmd
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/inventory-system.git
  git push -u origin main
  ```
- [ ] Verify repo is public
- [ ] README visible on GitHub

### Docker Hub Setup
- [ ] Create Docker Hub account (https://hub.docker.com/signup)
- [ ] Build backend image:
  ```cmd
  docker build -t YOUR_USERNAME/inventory-backend:latest ./backend
  ```
- [ ] Test image runs:
  ```cmd
  docker run -p 8000:8000 YOUR_USERNAME/inventory-backend:latest
  ```
- [ ] Login to Docker: `docker login`
- [ ] Push image:
  ```cmd
  docker push YOUR_USERNAME/inventory-backend:latest
  ```
- [ ] Verify image on Docker Hub

### Backend Deployment (Render)
- [ ] Create Render account (https://render.com/signup)
- [ ] Create "New Web Service"
- [ ] Connect GitHub repository
- [ ] Set configuration:
  ```
  Name: inventory-backend
  Runtime: Python 3
  Build Command: pip install -r requirements.txt
  Start Command: uvicorn app.main:app --host 0.0.0.0 --port 8000
  Plan: Free
  Region: Choose closest
  ```
- [ ] Create PostgreSQL database
- [ ] Copy DATABASE_URL from Render PostgreSQL
- [ ] Add environment variables:
  ```
  DATABASE_URL=<from-render-postgres>
  ALLOWED_ORIGINS=http://localhost,https://your-vercel-url.com
  ```
- [ ] Deploy and wait for "Live"
- [ ] Test health endpoint: `GET https://your-backend.onrender.com/health`
- [ ] Test API docs: `GET https://your-backend.onrender.com/docs`
- [ ] Record backend URL

### Frontend Deployment (Vercel)
- [ ] Create Vercel account (https://vercel.com/signup)
- [ ] Click "Add New Project"
- [ ] Import your GitHub repository
- [ ] Set configuration:
  ```
  Framework: Vite
  Root Directory: ./frontend
  Build Command: npm run build
  Output Directory: dist
  ```
- [ ] Add environment variable:
  ```
  VITE_API_URL=https://your-backend.onrender.com
  ```
- [ ] Deploy and wait for completion
- [ ] Test frontend loads: `https://your-project.vercel.app`
- [ ] Test navigation (all pages load)
- [ ] Record frontend URL

---

## ☐ Testing & Verification

### Backend Testing
- [ ] Health check responds (200): `https://your-backend.onrender.com/health`
- [ ] API docs load: `https://your-backend.onrender.com/docs`
- [ ] Can list products: `GET /products`
- [ ] Can create product: `POST /products`
  ```json
  {
    "name": "Test Product",
    "sku": "TEST-001",
    "price": 99.99,
    "quantity": 10
  }
  ```
- [ ] Duplicate SKU returns 409
- [ ] Can list customers: `GET /customers`
- [ ] Can create customer: `POST /customers`
  ```json
  {
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234"
  }
  ```
- [ ] Duplicate email returns 409
- [ ] Can list orders: `GET /orders`
- [ ] Can create order: `POST /orders`
  ```json
  {
    "customer_id": 1,
    "items": [{"product_id": 1, "quantity": 2}]
  }
  ```
- [ ] Stock decreases after order
- [ ] Can cancel order: `DELETE /orders/{id}`
- [ ] Stock restores after cancel
- [ ] Dashboard stats correct: `GET /dashboard`

### Frontend Testing
- [ ] Page loads without errors
- [ ] Navigation works (all 4 sections)
- [ ] Dashboard displays stats
- [ ] Dashboard shows low-stock table
- [ ] Products page loads
- [ ] Can add product
  - [ ] Form validates (empty fields)
  - [ ] Can submit valid product
  - [ ] Product appears in list
  - [ ] Can edit product
  - [ ] Can delete product
- [ ] Customers page loads
- [ ] Can add customer
  - [ ] Form validates email
  - [ ] Can submit
  - [ ] Customer appears in list
  - [ ] Can delete customer
- [ ] Orders page loads
- [ ] Can create order
  - [ ] Customer dropdown works
  - [ ] Product dropdown shows stock
  - [ ] Can add multiple items
  - [ ] Total preview calculates
  - [ ] Can submit
  - [ ] Order appears in list
  - [ ] Can expand order details
  - [ ] Can cancel order
- [ ] Toast messages show (success/error)
- [ ] Responsive on mobile (resize window)
- [ ] No console errors

### Integration Testing
- [ ] Create product via frontend
- [ ] Create customer via frontend
- [ ] Create order via frontend
- [ ] Verify stock decreased
- [ ] View order details
- [ ] Cancel order
- [ ] Verify stock restored
- [ ] Check dashboard updated

---

## ☐ Final Submission

### Documentation
- [ ] README.md is complete
- [ ] QUICK_START.md is accurate
- [ ] SUBMISSION.md reviewed
- [ ] DEPLOYMENT.md has real URLs
- [ ] PROJECT_SUMMARY.md verified

### URLs Ready
- [ ] GitHub repo link: `https://github.com/YOUR_USERNAME/inventory-system`
- [ ] Docker image link: `https://hub.docker.com/r/YOUR_USERNAME/inventory-backend`
- [ ] Frontend URL: `https://your-project.vercel.app`
- [ ] Backend URL: `https://your-backend.onrender.com`

### Code Quality
- [ ] No hardcoded passwords
- [ ] No secrets in .env (only .env.example)
- [ ] .gitignore working (no node_modules, __pycache__, .env)
- [ ] README visible on GitHub
- [ ] Backend Dockerfile is production-ready
- [ ] Frontend Dockerfile builds successfully
- [ ] docker-compose.yml works locally

### Submission Package
- [ ] Create `SUBMISSION_PACKAGE.txt`:
  ```
  PROJECT: Inventory & Order Management System
  
  GITHUB REPOSITORY:
  https://github.com/YOUR_USERNAME/inventory-system
  
  DOCKER HUB IMAGE:
  https://hub.docker.com/r/YOUR_USERNAME/inventory-backend
  
  LIVE FRONTEND:
  https://your-project.vercel.app
  
  LIVE BACKEND:
  https://your-backend.onrender.com
  
  API DOCUMENTATION:
  https://your-backend.onrender.com/docs
  
  All systems live and tested ✅
  ```

---

## 📋 Submission Checklist

Before you submit, ensure:

- [ ] All 4 required links are working
- [ ] Frontend loads and is responsive
- [ ] Backend API responds
- [ ] Can create products without errors
- [ ] Can create customers without errors
- [ ] Can create orders without errors
- [ ] Stock management works (decrease & restore)
- [ ] Dashboard shows stats
- [ ] API documentation is accessible
- [ ] No error messages in console
- [ ] Code is on GitHub (public)
- [ ] Docker image is on Docker Hub
- [ ] All documentation files are in repo

---

## 🚀 Final Steps

1. **Double-check all 4 URLs work in browser**
2. **Do a complete user flow test:**
   - Add product ✅
   - Add customer ✅
   - Create order ✅
   - Check stock decreased ✅
   - Cancel order ✅
   - Check stock restored ✅
3. **Review API docs one more time**
4. **Take screenshots** (optional but helpful):
   - Frontend homepage
   - Dashboard
   - Products list
   - API docs page
5. **Create submission email/document with 4 links**
6. **Send for evaluation**

---

## 📞 If Something Breaks

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Backend crashed. Check logs: `Render → Logs` |
| Frontend shows error | API URL wrong. Update Vercel env var |
| Database error | DATABASE_URL missing/wrong. Copy from Render |
| Port conflicts | Change docker-compose.yml ports |
| Image won't push | `docker login` first, then verify image name |
| Git push fails | `git config credential.helper store` then retry |

---

## ✅ You're Ready When:

- [x] Code written and tested locally
- [ ] Code pushed to GitHub
- [ ] Docker image built and pushed
- [ ] Backend deployed (responds to /health)
- [ ] Frontend deployed (loads without errors)
- [ ] All endpoints tested
- [ ] 4 URLs documented
- [ ] Ready to submit

**Estimated Time**: 40 minutes after starting deployment

---

**Status**: Ready for deployment 🚀
**Last Updated**: 2026-06-02
