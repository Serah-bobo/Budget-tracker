import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken";
import dotenv from "dotenv";
import User from "../Models/UserSchema"; // 👈 Ensure you import your User model

dotenv.config();

const jwt_refresh_token = process.env.JWT_Refresh_SECRET;

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      res.status(401).json({ message: "Refresh token is required" });
      return;
    }

    const decoded = jwt.verify(token, jwt_refresh_token!) as { id: string };

    // ✅ Check if user actually exists
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(403).json({ message: "Invalid refresh token: user not found" });
      return;
    }

    const newAccessToken = await generateToken(user._id.toString());

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
