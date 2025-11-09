import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("jwt secret daalde");
}

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      console.error("[AUTH][WARN] Missing fields:", {
        name,
        email,
        password,
        username,
      });
      return res.status(400).json({ message: "add all fields" });
    }

    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser || existingUsername) {
      console.log("⚠️ user pehle se hain:", {
        emailExists: !!existingUser,
        usernameExists: !!existingUsername,
      });
      return res.status(409).json({ message: "user pehle se hain" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newuser = new User({
      name,
      email,
      username,
      password: hash,
    });

    await newuser.save();


    return res.status(201).json({
      message: "user registered ",
      user: {
        id: newuser._id,
        name: newuser.name,
        email: newuser.email,
        username: newuser.username,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("missing ", { email, password });
      return res
        .status(400)
        .json({ message: "both email and password chahiye" });
    }

    const userexist = await User.findOne({ email }).select("+password");

    if (!userexist) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordcompare = await bcrypt.compare(password, userexist.password);
    if (!passwordcompare) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: userexist._id, email: userexist.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );


    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: userexist._id,
        name: userexist.name,
        email: userexist.email,
        username: userexist.username,
      },
    });
  } catch (err) {
    console.error("server error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
