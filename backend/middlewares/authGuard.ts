import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../@types/express";

const jwtsecret = process.env.JWT_SECRET as string;

const authGuard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ errors: ["Access denied"] });

  try {
    const verified = jwt.verify(token, jwtsecret) as { id: string };

    req.user = await User.findById(verified.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Invalid token"] });
  }
};

export { authGuard };
