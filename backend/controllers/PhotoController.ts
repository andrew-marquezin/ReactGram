import { Request, Response } from "express";
import { AuthRequest } from "../@types/express";
import User from "../models/User";
import Photo from "../models/Photo";

export class PhotoController {
  async insertPhoto(req: AuthRequest, res: Response) {
    const { title } = req.body;
    const image = req.file.filename;

    try {
      const user = await User.findById(req.user._id);

      const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
      });

      if (!newPhoto) {
        res.status(422).json({ errors: ["Photo insertion failed"] });
        return;
      }

      res.status(201).json(newPhoto);
    } catch (e) {
      res.status(422).json({ errors: ["Photo insertion failed"] });
      return;
    }
  }

  async deletePhoto(req: AuthRequest, res: Response) {
    const { id } = req.params;

    try {
      const photo = await Photo.findById(id);

      if (!photo) {
        res.status(404).json({ errors: ["Photo not found"] });
        return;
      }

      if (!photo.userId.equals(req.user._id)) {
        res.status(422).json({ errors: ["Permission denied"] });
        return;
      }

      await Photo.findByIdAndDelete(id);

      res
        .status(200)
        .json({ id: photo._id, message: "Photo deleted successfully" });
    } catch (e) {
      res.status(422).json({ errors: ["Photo deletion failed"] });
      return;
    }
  }

  async getAllPhotos(_: Request, res: Response) {
    try {
      const photos = await Photo.find({}).sort({ createdAt: -1 }).exec();

      res.status(200).json(photos);
    } catch (e) {
      res.status(422).json({ errors: ["Fetching photos failed"] });
      return;
    }
  }

  async getUserPhotos(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const photos = await Photo.find({ userId: id })
        .sort({ createdAt: -1 })
        .exec();

      res.status(200).json(photos);
    } catch (e) {
      res.status(422).json({ errors: ["Fetching user photos failed"] });
      return;
    }
  }

  async getPhotoById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const photo = await Photo.findById(id);

      if (!photo) {
        res.status(404).json({ errors: ["Photo not found"] });
        return;
      }

      res.status(200).json(photo);
    } catch (e) {
      res.status(422).json({ errors: ["Invalid photo ID"] });
      return;
    }
  }

  async updatePhoto(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { title } = req.body;

    try {
      const photo = await Photo.findById(id);

      if (!photo) {
        res.status(404).json({ errors: ["Photo not found"] });
        return;
      }

      if (!photo.userId.equals(req.user._id)) {
        res.status(422).json({ errors: ["Permission denied"] });
        return;
      }

      if (title) {
        photo.title = title;
      }

      await photo.save();

      res.status(200).json({ photo, message: "Photo updated successfully" });
    } catch (e) {
      res.status(422).json({ errors: ["Photo update failed"] });
      return;
    }
  }

  async likePhoto(req: AuthRequest, res: Response) {
    const { id } = req.params;

    try {
      const photo = await Photo.findById(id);

      if (!photo) {
        res.status(404).json({ errors: ["Photo not found"] });
        return;
      }

      if (photo.likes.includes(req.user._id)) {
        res.status(422).json({ errors: ["You have already liked this photo"] });
        return;
      }

      photo.likes.push(req.user._id);
      await photo.save();

      res.status(200).json({
        photoId: id,
        userId: req.user._id,
        message: "Photo liked successfully",
      });
    } catch (e) {
      res.status(422).json({ errors: ["Liking photo failed"] });
      return;
    }
  }

  async commentPhoto(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { comment } = req.body;

    try {
      const photo = await Photo.findById(id);

      const user = await User.findById(req.user._id);

      if (!photo) {
        res.status(404).json({ errors: ["Photo not found"] });
        return;
      }

      if (!user) {
        res.status(404).json({ errors: ["User not found"] });
        return;
      }

      const userComment = {
        comment,
        userId: user._id,
        userName: user.name,
        userImage: user.profileImage,
      };

      photo.comments.push(userComment);
      await photo.save();

      res.status(200).json({
        comment: userComment,
        message: "Comment added successfully",
      });
    } catch (e) {
      res.status(422).json({ errors: ["Adding comment failed"] });
      return;
    }
  }
}
