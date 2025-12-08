# OpenBox Frontend

Welcome to the **OpenBox Frontend** repository! This is the frontend service for the OpenBox project, providing the user interface and client-side functionality for the application.

## Features

- Modern and responsive UI built with React and Next.js
- Integration with the OpenBox backend API
- Optimized for performance and scalability
- Fully customizable and developer-friendly

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**

---

## Getting Started

Follow these steps to set up the frontend locally:

### 1. Clone the Repository

```bash
git clone https://github.com/naamyuvraj/openbox.git
cd frontend
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```
### 3. Set Up Environment Variables
Create a .env.local file in the root directory and configure the following environment variables:

# Example .env.local file
```bash
NEXT_PUBLIC_API_BASE_URL=https://openbox-r8z3.onrender.com
```

### 4. Start the Development Server
Run the development server:

```
npm run dev
# or
yarn dev
```


### Scripts
Here are the available scripts:

npm run dev: Start the development server with hot-reloading.
npm run build: Build the project for production.
npm start: Start the production server.
npm run lint: Run linting checks.

### Folder Structure
```
frontend/
├── components/         # Reusable UI components
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # Global and component-specific styles
├── utils/              # Utility functions
├── .env.local          # Environment variables
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

Happy coding! 🚀

