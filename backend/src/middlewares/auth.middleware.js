import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(
    "Jwt daalde"
  );
  process.exit(1);
}

export const authenticateToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      console.log("❌ No Bearer token in header");
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = header.split(" ")[1];
    console.log("🧩 Token received:", token.slice(0, 20) + "...");

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("❌ JWT verification failed:", err.message);
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      console.log("✅ Token verified:", decoded);
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error("🔥 Middleware error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



