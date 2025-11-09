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
    const header = req.headers.authorization || req.headers.Authorization;
    const token = header.split(" ")[1];

    if (!header?.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized access: No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
