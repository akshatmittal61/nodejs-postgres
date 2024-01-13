import blogsRouter from "./blogs";
import { Router } from "express";

const router = Router();

router.use("/blogs", blogsRouter);

export default router;
