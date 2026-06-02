# Quick Start Guide

## 🚀 5-Minute Local Setup

```cmd
REM Navigate to project
cd E:\inventory-system

REM Copy environment file
copy .env.example .env

REM Start all services
docker compose up --build
```

Wait for this output:
```
✔ db Pulled
✔ backend Running
✔ frontend Running
```

Then open in browser:
- **Frontend**: http://localhost
- **API Docs**: http://localhost:8000/docs

---

## 📋 Step-by-Step Submission

### Step 1: GitHub (5 minutes)
```cmd
git init
git add .
git commit -m "Inventory Management System"
git remote add origin https://github.com/YOUR_USERNAME/inventory-system.git
git branch -M main
git push -u origin main
```

✅ **Result**: `https://github.com/YOUR_USERNAME/inventory-system`

---

### Step 2: Docker Hub (5 minutes)
```cmd
REM First time only: docker login
docker login

REM Build image
docker build -t YOUR_USERNAME/inventory-backend:latest ./backend

REM Push to Docker Hub
docker push YOUR_USERNAME/inventory-backend:latest
```

✅ **Result**: `https://hub.docker.com/r/YOUR_USERNAME/inventory-backend`

---

### Step 3: Deploy Backend (10 minutes)

Go to **https://render.com**:
1. Sign up (free)
2. "New Web Service"
3. Connect GitHub → Select your repo
4. Enter settings:
   ```
   Name: inventory-backend
   Build: pip install -r requirements.txt
   Start: uvicorn app.main:app --host 0.0.0.0 --port 8000
   Plan: Free
   ```
5. Add Environment Variables:
   - `DATABASE_URL`: (copy from Render PostgreSQL after creating it)
   - `ALLOWED_ORIGINS`: (add your Vercel URL later)

6. In Render Dashboard → Create PostgreSQL database
7. Copy connection string → Set as `DATABASE_URL`

✅ **Result**: `https://inventory-backend-xxxxx.onrender.com`

---

### Step 4: Deploy Frontend (5 minutes)

Go to **https://vercel.com**:
1. Sign up (free)
2. "Add New Project"
3. Import GitHub repository
4. Settings:
   ```
   Framework: Vite
   Root Directory: ./frontend
   Build: npm run build
   Output: dist
   ```
5. Environment Variable:
   ```
   VITE_API_URL=https://inventory-backend-xxxxx.onrender.com
   ```
6. Click "Deploy"

Wait 2-3 minutes...

✅ **Result**: `https://your-project.vercel.app`

---

### Step 5: Verify Live URLs (5 minutes)

Test frontend:
```
Open: https://your-project.vercel.app
Create product → Create customer → Create order
```

Test API:
```
Open: https://inventory-backend-xxxxx.onrender.com/docs
Try endpoints
```

---

## 📝 Final Submission

Create file `FINAL_SUBMISSION.txt` with:

```
INVENTORY MANAGEMENT SYSTEM - SUBMISSION

GitHub Repository:
https://github.com/YOUR_USERNAME/inventory-system

Docker Hub Image:
https://hub.docker.com/r/YOUR_USERNAME/inventory-backend

Live Frontend:
https://your-project.vercel.app

Live Backend:
https://inventory-backend-xxxxx.onrender.com

Status: ✅ All live and tested
```

---

## 🧪 Quick Test Commands

```cmd
REM Test backend health
curl https://your-backend-url.com/health

REM Test API docs
curl https://your-backend-url.com/docs

REM Test frontend loads
curl https://your-frontend-url.com
```

All should return 200 status ✅

---

## ❓ Troubleshooting

**Frontend not connecting to backend?**
- Check VITE_API_URL in Vercel environment variables
- Redeploy frontend after changing it

**Backend database error?**
- Copy full DATABASE_URL from Render PostgreSQL
- Make sure it includes: postgresql://user:pass@host:5432/dbname

**Docker push failed?**
- Run `docker login` first
- Check Docker Hub username matches your image tag

**Port 80 in use?**
- Change docker-compose.yml frontend port to 8080:80
- Access via http://localhost:8080

---

## ✅ Checklist Before Submitting

- [ ] GitHub repo is public
- [ ] Code is pushed to GitHub
- [ ] Docker image builds and pushes
- [ ] Backend deployed and responding
- [ ] Frontend deployed and loads
- [ ] Can create products
- [ ] Can create customers
- [ ] Can create orders
- [ ] Stock decreases on order
- [ ] API docs accessible
- [ ] Dashboard works
- [ ] All 4 URLs documented

---

## 📞 Need Help?

1. Check logs: `docker compose logs -f`
2. Read README.md for details
3. Check DEPLOYMENT.md for configuration
4. Review SUBMISSION.md for requirements

**Total Time**: ~30 minutes from start to live deployment ⏱️
