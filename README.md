# 🛍️ ShopNest — MERN E-Commerce Platform

ShopNest is a full-stack **MERN (MongoDB, Express.js, React.js, Node.js) e-commerce web application** designed to provide a complete online shopping experience.

The application allows users to browse products, create accounts, manage their shopping cart, place orders, and interact with the platform through a responsive and user-friendly interface.

---

## 🚀 Features

### 👤 User Authentication

* User registration and login
* Secure authentication
* Protected routes
* User session management
* Logout functionality

### 🛒 Shopping Cart

* Add products to cart
* Remove products from cart
* Update product quantities
* View cart summary
* Calculate total price

### 📦 Product Management

* Browse available products
* View individual product details
* Product categorization
* Product images
* Product pricing and descriptions

### 💳 Order Management

* Create orders from cart items
* Store order information
* View order details
* Track order status

### 📱 Responsive UI

* Responsive design for desktop and mobile devices
* Clean and intuitive navigation
* Modern e-commerce interface

### 🔐 Backend API

* RESTful API architecture
* Authentication endpoints
* Product endpoints
* Cart/order endpoints
* MongoDB database integration

---

## 🏗️ Tech Stack

### Frontend

* **React.js**
* **JavaScript**
* **HTML5**
* **CSS3**
* React Router

### Backend

* **Node.js**
* **Express.js**
* REST APIs

### Database

* **MongoDB**
* MongoDB Atlas

### Authentication & Security

* JWT
* bcrypt
* Environment variables

### Development Tools

* Git & GitHub
* npm
* Nodemon
* Concurrently

---

## 📁 Project Structure

```text
ShopNest/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

> The exact folder structure may vary depending on the implementation.

---

## 🔄 Application Architecture

```text
                     ┌──────────────────┐
                     │      User        │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ React Frontend   │
                     │   ShopNest UI    │
                     └────────┬─────────┘
                              │
                         HTTP Requests
                              │
                              ▼
                     ┌──────────────────┐
                     │ Express.js API   │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ Node.js Backend  │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │     MongoDB      │
                     └──────────────────┘
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ShopNest.git
```

```bash
cd ShopNest
```

---

## 🖥️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

The backend should now run on:

```text
http://localhost:5000
```

---

## 🌐 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will usually run on:

```text
http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### Frontend

If your frontend uses environment variables, create:

```text
frontend/.env
```

For example:

```env
REACT_APP_API_URL=http://localhost:5000
```

> Never upload `.env` files containing credentials or API keys to GitHub.

Add them to `.gitignore`:

```gitignore
.env
node_modules/
```

---

## 🛠️ Running the Complete Application

If your project uses **concurrently**, you can run frontend and backend together from the root project:

```bash
npm run dev
```

For example, your root `package.json` can contain:

```json
{
  "scripts": {
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
}
```

Then simply run:

```bash
npm run dev
```

---

## 🔐 Authentication Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
Express API
 │
 ▼
Validate Credentials
 │
 ▼
MongoDB
 │
 ▼
Generate JWT
 │
 ▼
Authenticated User
```

Protected resources can then be accessed using the authentication token.

---

## 🛒 Shopping Flow

```text
Browse Products
       │
       ▼
Product Details
       │
       ▼
Add to Cart
       │
       ▼
Review Cart
       │
       ▼
Checkout
       │
       ▼
Create Order
       │
       ▼
Order Confirmation
```

---

## 📡 API Structure

The backend follows a REST API architecture.

Typical API categories include:

```text
/api/auth
/api/products
/api/users
/api/cart
/api/orders
```

Example authentication endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login
```

Example product endpoints:

```text
GET    /api/products
GET    /api/products/:id
```

Example order endpoints:

```text
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
```

> Update these endpoints if your actual backend routes use different paths.

---

## 🗄️ Database

ShopNest uses **MongoDB** for storing application data.

Typical collections include:

```text
Users
Products
Orders
```

Example relationship:

```text
User
 │
 ├── Cart
 │
 └── Orders
       │
       └── Products
```

---

## 🎨 Frontend

The React frontend is responsible for:

* Rendering the user interface
* Product browsing
* Authentication pages
* Cart management
* Order pages
* Communicating with backend APIs
* Handling client-side routing

Example page structure:

```text
Home
 │
 ├── Products
 │
 ├── Product Details
 │
 ├── Cart
 │
 ├── Login
 │
 ├── Register
 │
 └── Orders
```

---

## 📸 Screenshots

Add screenshots of your application here.

Example:

```markdown
## Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Product Page

![Product Page](screenshots/product.png)

### Shopping Cart

![Cart](screenshots/cart.png)

### Login

![Login](screenshots/login.png)
```

---

## 🔒 Security

The project follows common web application security practices such as:

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Environment variables for sensitive configuration
* CORS configuration
* Input validation

---

## 🚀 Deployment

The application can be deployed using services such as:

### Frontend

* Vercel
* Netlify

### Backend

* Render
* Railway

### Database

* MongoDB Atlas

Example production architecture:

```text
                   Internet
                      │
             ┌────────┴────────┐
             ▼                 ▼
       React Frontend      Express API
                              │
                              ▼
                         MongoDB Atlas
```

---

## 🔮 Future Improvements

Possible improvements include:

* [ ] Product search
* [ ] Product filtering
* [ ] Product sorting
* [ ] Wishlist
* [ ] Product reviews and ratings
* [ ] Payment gateway integration
* [ ] Admin dashboard
* [ ] Inventory management
* [ ] Order tracking
* [ ] Email notifications
* [ ] Image upload
* [ ] Pagination
* [ ] Advanced product recommendations
* [ ] Improved mobile UI

---

## 🧪 Development

Run the backend:

```bash
cd backend
npm run dev
```

Run the frontend:

```bash
cd frontend
npm start
```

Or, if configured with `concurrently`:

```bash
npm run dev
```

---

## ⚠️ Important

Before deploying the application:

* Replace development URLs with production URLs.
* Configure production environment variables.
* Never commit `.env` files.
* Configure MongoDB Atlas network access correctly.
* Configure CORS for the production frontend.
* Use a strong JWT secret.

---

## 📄 License

This project is created for educational and development purposes.

If you plan to distribute or modify the project publicly, add an appropriate open-source license.

---

## 👨‍💻 Author

**Your Name**

### Built With

```text
React.js
Node.js
Express.js
MongoDB
JWT
JavaScript
CSS
```

---

## ⭐ Project Summary

**ShopNest** is a full-stack MERN e-commerce application demonstrating how a modern shopping platform can be built using a React frontend, Node/Express backend, and MongoDB database.

The project focuses on implementing the complete flow from:

```text
User Authentication
        ↓
Product Browsing
        ↓
Cart Management
        ↓
Order Creation
        ↓
Database Storage
```

while maintaining a clean separation between the frontend and backend.
