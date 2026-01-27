import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { AuthRequest } from "../@types/express";

const jwtsecret = process.env.JWT_SECRET as string;

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, jwtsecret, {
    expiresIn: "7d",
  });
};

export class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        res.status(422).json({ errors: ["User already exists"] });
        return;
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: passwordHash,
      });

      if (!newUser) {
        res
          .status(422)
          .json({ errors: ["Something went wrong, please try again later."] });
        return;
      }

      res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
      });
    } catch (e) {
      res.status(422).json({ errors: ["Registration failed"] });
      return;
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ errors: ["User not found"] });
        return;
      }

      if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ["Incorrect password"] });
        return;
      }

      res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
      });
    } catch (e) {
      res.status(422).json({ errors: ["Login failed"] });
      return;
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response) {
    const user = req.user;
    res.status(200).json(user);
  }

  async update(req: AuthRequest, res: Response) {
    const { name, password, bio } = req.body;
    let profileImage = null;

    if (req.file) {
      profileImage = req.file.filename;
    }

    try {
      const user = await User.findById(req.user._id).select("-password");

      if (name) {
        user.name = name;
      }

      if (password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        user.password = passwordHash;
      }

      if (bio) {
        user.bio = bio;
      }

      await user.save();

      res.status(200).json(user);
    } catch (e) {
      res.status(422).json({ errors: ["Update failed"] });
      return;
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await User.findById(id).select("-password");

      if (!user) {
        res.status(404).json({ errors: ["User not found"] });
        return;
      }

      res.status(200).json(user);
    } catch (e) {
      res.status(422).json({ errors: ["Invalid user ID"] });
      return;
    }
  }
}
