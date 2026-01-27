import { Request, Response, Router } from "express";
import userRouter from "./UserRoutes";
import photoRouter from "./photoRoutes";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Hello from Router!");
});

router.use("/api/users", userRouter);

router.use("/api/photos", photoRouter);

export default router;
