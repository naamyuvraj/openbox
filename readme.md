# OpenBox 📦

OpenBox is a web-based collaborative code workspace inspired by CodeSandbox. It features an intuitive IDE environment where multiple developers can work on the same codebase seamlessly while tracking changes, managing files, and compiling code.

## 🚀 Features

- **Project Management:** Create, upload, and organize coding projects.
- **Collaborative IDE:** Share project workspaces and edit files.
- **Version Control:** Built-in commit tracking and activity dashboard.
- **Performant File Handling:** Bulk directory uploads using JSZip and up to 50MB limits for seamless processing.
- **Real-Time Data (Coming Soon):** Live collaboration metrics.

## 🛠 Tech Stack

**Frontend**
- Next.js 14+ (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend**
- Node.js
- Express
- MongoDB / Mongoose

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/openbox.git
   cd openbox
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with your variables (MONGO_URI, JWT_SECRET, etc.)
   npm run start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create a .env.local mapped to your backend API
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser!
