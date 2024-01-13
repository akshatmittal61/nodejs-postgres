import { Router } from "express";
import * as blogsController from "../controllers/blogs";

const router = Router();

router
	.route("/")
	.get(blogsController.getAllBlogs)
	.post(blogsController.createBlog);
router
	.route("/:id")
	.get(blogsController.getBlogById)
	.patch(blogsController.updateBlog)
	.delete(blogsController.deleteBlog);

export default router;
