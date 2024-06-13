Sure, here is a simplified version of the `README.md` file:

---

# E-Commerce Backend API

This is a backend API for an e-commerce application. It provides functionalities to manage users, categories, products, and carts. The API is built using Node.js, Express, and MongoDB.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ecomm-backend.git
   cd ecomm-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create `configs/db.config.js`:

   ```javascript
   module.exports = {
     DB_URL: "mongodb://localhost:27017/ecomm",
   };
   ```

2. Create `configs/auth.config.js`:

   ```javascript
   module.exports = {
     secret: "your-secret-key",
   };
   ```

3. Create `configs/server.config.js`:

   ```javascript
   module.exports = {
     PORT: 5000,
   };
   ```

## Running the Server

Start the server using the following command:

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

### Auth Routes

- **Sign Up**

  - **URL:** `/ecomm/api/v1/auth/signup`
  - **Method:** `POST`
  - **Body:**

    ```json
    {
      "name": "John Doe",
      "userId": "johndoe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

- **Sign In**

  - **URL:** `/ecomm/api/v1/auth/signin`
  - **Method:** `POST`
  - **Body:**

    ```json
    {
      "userId": "johndoe",
      "password": "password123"
    }
    ```

### Category Routes

- **Create Category**

  - **URL:** `/ecomm/api/v1/categories`
  - **Method:** `POST`
  - **Body:**

    ```json
    {
      "name": "Electronics",
      "description": "Gadgets and devices"
    }
    ```

- **Get All Categories**

  - **URL:** `/ecomm/api/v1/categories`
  - **Method:** `GET`

### Product Routes

- **Create Product**

  - **URL:** `/ecomm/api/v1/products`
  - **Method:** `POST`
  - **Body:**

    ```json
    {
      "name": "Smartphone",
      "description": "Latest model",
      "price": 699,
      "categoryId": "60c72b2f5f1b2c001c8e4a3a"
    }
    ```

- **Get All Products**

  - **URL:** `/ecomm/api/v1/products`
  - **Method:** `GET`

---
