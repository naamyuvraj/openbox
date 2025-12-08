# OpenBox Backend

Welcome to the **OpenBox Backend** repository! This is the backend service for the OpenBox project, providing APIs and server-side functionality for the application.

## Features

- RESTful API for managing OpenBox resources
- Authentication and authorization
- Database integration
- Lightweight and scalable architecture

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**
- **MongoDB** (or any other database if configured)

---

## Getting Started

Follow these steps to set up the backend locally:

### 1. Clone the Repository

```
git clone https://github.com/naamyuvraj/openbox.git
cd backend
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory and configure the following environment variables:


# Example .env file
```
MONGO_URI = 'Your mongodburl'
JWT_SECRET = 'your jwt secret'
PORT=5170
GOOGLE_CLIENT_ID='your google client id'
GOOGLE_CLIENT_SECRET='your google client secret'
BASE_URL = https://openbox-r8z3.onrender.com
```

Replace your_jwt_secret with a secure secret key.

### 4. Start the Development Server

Run the development server:

```
npm run dev
# or
yarn dev
```

The server will start on http://localhost:5170 (or the port specified in your .env file).

### Scripts
Here are the available scripts:

npm run dev: Start the development server with hot-reloading.
npm start: Start the production server.
npm run build: Build the project for production.
npm test: Run tests (if configured).


```
backend/
├── src/
│   ├── controllers/    # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middlewares/    # Middleware functions
│   ├── utils/          # Utility functions
│   └── app.js          # Main application file
├── .env.example        # Example environment variables
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```


Happy coding! 🚀

