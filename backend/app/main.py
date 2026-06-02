from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from .database import engine, Base, SessionLocal
from .models import Product, Customer, Order
from .schemas import DashboardStats
from .routers import products, customers, orders
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory & Order Management API",
    version="1.0.0",
    description="Production-ready API for managing products, customers, and orders.",
)

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/dashboard", response_model=DashboardStats)
def dashboard():
    db = SessionLocal()
    try:
        total_products = db.query(func.count(Product.id)).scalar()
        total_customers = db.query(func.count(Customer.id)).scalar()
        total_orders = db.query(func.count(Order.id)).scalar()
        low_stock = db.query(Product).filter(Product.quantity <= 10).all()
        return DashboardStats(
            total_products=total_products,
            total_customers=total_customers,
            total_orders=total_orders,
            low_stock_products=low_stock,
        )
    finally:
        db.close()
