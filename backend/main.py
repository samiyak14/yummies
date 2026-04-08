from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()

# Enable CORS (VERY IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data
restaurants = [
    {
        "id": 1,
        "name": "Pizza Place",
        "image": "https://yummies-images.s3.ap-south-1.amazonaws.com/pizza.jpg",  # ✅ ADD THIS
        "rating": 4.5,
        "reviews": 120,
        "delivery_time": 30,
        "delivery_fee": 40,
        "cuisine": "Pizza",
        "menu": [
            {"id": 1, "name": "Margherita Pizza", "price": 10.0}
        ]
    },
    {
        "id": 2,
        "name": "Burger Joint",
        "image": "https://yummies-images.s3.ap-south-1.amazonaws.com/burger.jpg",  # ✅ ADD THIS
        "rating": 4.2,
        "reviews": 90,
        "delivery_time": 25,
        "delivery_fee": 30,
        "cuisine": "Burgers",
        "menu": [
            {"id": 1, "name": "Cheeseburger", "price": 8.0}
        ]
    }
]
cart = []
orders = []

class Order(BaseModel):
    restaurant_id: int
    item_id: int
    quantity: int

@app.get("/restaurants")
def get_restaurants():
    return restaurants

@app.get("/restaurants/{restaurant_id}/menu")
def get_menu(restaurant_id: int):
    restaurant = next((r for r in restaurants if r["id"] == restaurant_id), None)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant["menu"]

@app.post("/cart")
def add_to_cart(order: Order):
    restaurant = next((r for r in restaurants if r["id"] == order.restaurant_id), None)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    item = next((i for i in restaurant["menu"] if i["id"] == order.item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")

    cart.append({
        "restaurant_id": order.restaurant_id,
        "item_id": order.item_id,
        "quantity": order.quantity
    })

    return {"message": "Item added to cart", "cart": cart}

@app.get("/cart")
def view_cart():
    return cart

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