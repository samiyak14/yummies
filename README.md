# Yummies - Food Delivery Application

A full-stack food delivery application built with React (frontend) and FastAPI (backend). Browse restaurants, view menus, add items to your cart, and place orders.

## Project Structure

```
yummies/
├── frontend (React)
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components (Home, Menu, Cart)
│   │   ├── styles/           # CSS stylesheets
│   │   ├── App.js            # Main App component
│   │   └── CartContext.js    # Context for cart state management
│   ├── public/               # Static files
│   └── package.json          # Frontend dependencies
│
└── backend (FastAPI)
    ├── main.py               # FastAPI application entry point
    ├── models.py             # Data models
    ├── database.py           # Database configuration
    ├── routes/               # API route handlers
    └── requirements.txt      # Backend dependencies
```

## Prerequisites

- **Node.js** (v14 or higher) and npm
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

## Installation & Setup

### 1. Clone/Navigate to the Project

```bash
cd yummies
```

### 2. Backend Setup

#### Create a Python Virtual Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate
```

#### Install Backend Dependencies

```bash
pip install -r backend/requirements.txt
```

### 3. Frontend Setup

#### Install Frontend Dependencies

```bash
npm install
```

## Running the Project

### Start the Backend Server

From the project root (with the virtual environment activated):

```bash
cd backend
python main.py
```

The backend API will run on `http://localhost:8000`

**API Documentation** is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Start the Frontend Development Server

In a new terminal (from the project root):

```bash
npm start
```

The frontend will open automatically at `http://localhost:3000`

## Available Scripts

### Frontend Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (not reversible)
npm run eject
```

## API Endpoints

The backend provides the following endpoints:

### Restaurants
- `GET /restaurants` - Get all restaurants
- `GET /restaurants/{id}` - Get restaurant details

### Orders
- `GET /orders` - Get all orders
- `POST /orders` - Create a new order
- `GET /orders/{id}` - Get order details

### Cart
- `GET /cart` - Get cart items
- `POST /cart` - Add item to cart
- `DELETE /cart/{item_id}` - Remove item from cart

## Features

- 🏪 Browse restaurants and their menus
- 🛒 Add items to shopping cart
- 📋 View order history
- 🎨 Responsive UI with React Router navigation
- ⚡ Fast API powered backend with CORS enabled

## Tech Stack

### Frontend
- React 19.2.4
- React Router DOM 7.13.1
- React Scripts 5.0.1
- CSS3

### Backend
- FastAPI 0.104.1
- Uvicorn 0.24.0 (ASGI server)
- Pydantic 2.5.0 (data validation)

## Development Notes

- **CORS is enabled** on the backend to allow requests from the React frontend
- The backend runs on port `8000` by default
- The frontend runs on port `3000` by default
- Frontend uses Context API (CartContext) for state management

## Troubleshooting

### Port Already in Use
If port 3000 or 8000 is already in use, you can specify a different port:

**Frontend:**
```bash
PORT=3001 npm start
```

**Backend:**
Modify `main.py` to use a different port (e.g., `uvicorn.run(app, host="0.0.0.0", port=8001)`)

### Virtual Environment Issues
If the virtual environment doesn't activate, try:
```bash
python -m venv .venv --clear
# then activate and reinstall dependencies
```

### CORS Errors
Ensure the backend is running and CORS middleware is properly configured. Check that both frontend and backend are running simultaneously.

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is part of a coursework assignment.

---

**Happy Coding! 🍕🍔🍱**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
