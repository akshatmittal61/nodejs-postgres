import { Request, Response } from "express";
import * as blogsService from "../services/blogs";
import { HTTP_STATUS_CODES, RESPONSE_MESSAGES } from "../constants/enum";

export const getAllBlogs = async (req: Request, res: Response) => {
	try {
		const blogs = await blogsService.findAll();
		return res.status(HTTP_STATUS_CODES.SUCCESS).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			blogs,
		});
	} catch (error) {
		console.error(error);
		return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
			message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};

export const getBlogById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const blog = await blogsService.findById(id);
        if (!blog) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                message: RESPONSE_MESSAGES.NOT_FOUND,
            });
        }
        return res.status(HTTP_STATUS_CODES.SUCCESS).json({
            message: RESPONSE_MESSAGES.SUCCESS,
            blog,
        });
    } catch (error) {
        console.error(error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};

export const createBlog = async (req: Request, res: Response) => {
    const { title, body, author } = req.body;
    try {
        if (!title || !body || !author) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: RESPONSE_MESSAGES.BAD_REQUEST,
            });
        }
        const blog = await blogsService.create(title, body, author);
        return res.status(HTTP_STATUS_CODES.CREATED).json({
            message: RESPONSE_MESSAGES.SUCCESS,
            blog,
        });
    } catch (error) {
        console.error(error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, body, author } = req.body;
    try {
        if (!title || !body || !author) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: RESPONSE_MESSAGES.BAD_REQUEST,
            });
        }
        const blog = await blogsService.update(id, title, body, author);
        if (!blog) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                message: RESPONSE_MESSAGES.NOT_FOUND,
            });
        }
        return res.status(HTTP_STATUS_CODES.SUCCESS).json({
            message: RESPONSE_MESSAGES.SUCCESS,
            blog,
        });
    } catch (error) {
        console.error(error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const blog = await blogsService.remove(id);
        if (!blog) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                message: RESPONSE_MESSAGES.NOT_FOUND,
            });
        }
        return res.status(HTTP_STATUS_CODES.NO_CONTENT).json({
            message: RESPONSE_MESSAGES.SUCCESS,
        });
    } catch (error) {
        console.error(error);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
};
