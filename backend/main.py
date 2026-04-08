from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
import uuid

app = FastAPI()

# ✅ Enable CORS (for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 🔥 DATABASE CONNECTION (EDIT THIS ONLY)
DATABASE_URL = "postgresql://postgres:080712sk@yummies-db.cboi862miacx.ap-south-1.rds.amazonaws.com:5432/postgres"

engine = create_engine(DATABASE_URL)

# -----------------------------
# TEMP IN-MEMORY STORAGE
# -----------------------------
cart = []
orders = []

# -----------------------------
# MODELS
# -----------------------------
class Order(BaseModel):
    restaurant_id: int
    item_id: int
    quantity: int


# -----------------------------
# CREATE TABLE ON STARTUP
# -----------------------------
@app.on_event("startup")
def create_tables():
    with engine.connect() as conn:
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name TEXT,
                image TEXT,
                rating FLOAT,
                reviews INT,
                delivery_time INT,
                delivery_fee INT,
                cuisine TEXT
            );
        """))


# -----------------------------
# INIT DATABASE (RUN ONCE)
# -----------------------------
@app.get("/init-db")
def init_db():
    try:
        with engine.begin() as conn:  # ✅ IMPORTANT CHANGE
            conn.execute(text("""
                INSERT INTO restaurants 
                (name, image, rating, reviews, delivery_time, delivery_fee, cuisine)
                VALUES
                ('Pizza Place', 'https://yummies-images.s3.ap-south-1.amazonaws.com/pizza.jpg', 4.5, 120, 30, 40, 'Pizza'),
                ('Burger Joint', 'https://yummies-images.s3.ap-south-1.amazonaws.com/burger.jpg', 4.2, 90, 25, 30, 'Burgers');
            """))
        return {"message": "Database initialized"}
    except Exception as e:
        return {"error": str(e)}


# -----------------------------
# GET RESTAURANTS FROM DB
# -----------------------------
@app.get("/restaurants")
def get_restaurants():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM restaurants"))
        return [dict(row._mapping) for row in result]


# -----------------------------
# TEMP MENU (STILL HARDCODED)
# -----------------------------
@app.get("/restaurants/{restaurant_id}/menu")
def get_menu(restaurant_id: int):
    try:
        with engine.connect() as conn:
            result = conn.execute(
                text("SELECT * FROM menu WHERE restaurant_id = :rid"),
                {"rid": restaurant_id}
            )
            return [dict(row._mapping) for row in result]
    except Exception as e:
        return {"error": str(e)}


# -----------------------------
# CART
# -----------------------------
@app.post("/cart")
def add_to_cart(order: Order):
    cart.append({
        "restaurant_id": order.restaurant_id,
        "item_id": order.item_id,
        "quantity": order.quantity
    })

    return {
        "message": "Item added to cart",
        "cart": cart
    }


@app.get("/cart")
def view_cart():
    return cart


# -----------------------------
# ORDERS
# -----------------------------
@app.post("/orders")
def place_order():
    if not cart:
        raise HTTPException(status_code=400, detail="Cart is empty")

    order_id = str(uuid.uuid4())

    new_order = {
        "order_id": order_id,
        "items": cart.copy(),
        "status": "Order Received"
    }

    orders.append(new_order)
    cart.clear()

    return {
        "message": "Order placed successfully",
        "order_id": order_id
    }


@app.get("/orders")
def get_orders():
    return orders

@app.get("/create-table")
def create_table():
    try:
        with engine.begin() as conn:  # ✅ IMPORTANT CHANGE
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS restaurants (
                    id SERIAL PRIMARY KEY,
                    name TEXT,
                    image TEXT,
                    rating FLOAT,
                    reviews INT,
                    delivery_time INT,
                    delivery_fee INT,
                    cuisine TEXT
                );
            """))
        return {"message": "Table created successfully"}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/create-menu-table")
def create_menu_table():
    try:
        with engine.begin() as conn:
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS menu (
                    id SERIAL PRIMARY KEY,
                    restaurant_id INT,
                    name TEXT,
                    price FLOAT,
                    image TEXT
                );
            """))
        return {"message": "Menu table created"}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/init-menu")
def init_menu():
    try:
        with engine.begin() as conn:
            conn.execute(text("""
                INSERT INTO menu (restaurant_id, name, price, image)
                VALUES
                (1, 'Margherita Pizza', 10.0, 'https://yummies-images.s3.ap-south-1.amazonaws.com/margherita.jpg'),
                (2, 'Cheeseburger', 8.0, 'https://yummies-images.s3.ap-south-1.amazonaws.com/cheeseburger.jpg');
            """))
        return {"message": "Menu initialized"}
    except Exception as e:
        return {"error": str(e)}