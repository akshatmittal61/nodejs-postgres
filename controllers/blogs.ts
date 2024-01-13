import { Request, Response } from "express";
import * as blogsService from "../services/blogs";
import { HTTP_STATUS_CODES, RESPONSE_MESSAGES } from "../constants/enum";
import log from "../log";

export const getAllBlogs = async (req: Request, res: Response) => {
	try {
		const blogs = await blogsService.findAll();
		return res.status(HTTP_STATUS_CODES.SUCCESS).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			blogs,
		});
	} catch (error: any) {
		log.error(error);
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
            log.error(`Blog with id ${id} not found`);
			return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
				message: RESPONSE_MESSAGES.NOT_FOUND,
			});
		}
		return res.status(HTTP_STATUS_CODES.SUCCESS).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			blog,
		});
	} catch (error: any) {
		log.error(error);
		return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
			message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};

export const createBlog = async (req: Request, res: Response) => {
	const { title, body, author } = req.body;
	try {
        if (!title || !body || !author) {
            log.error(`Missing required fields`);
			return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
				message: RESPONSE_MESSAGES.BAD_REQUEST,
			});
		}
		const blog = await blogsService.create(title, body, author);
		return res.status(HTTP_STATUS_CODES.CREATED).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			blog,
		});
	} catch (error: any) {
		log.error(error);
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
            log.error(`Missing required fields`);
			return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
				message: RESPONSE_MESSAGES.BAD_REQUEST,
			});
		}
		const blog = await blogsService.update(id, title, body, author);
        if (!blog) {
            log.error(`Blog with id ${id} not found`);
			return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
				message: RESPONSE_MESSAGES.NOT_FOUND,
			});
		}
		return res.status(HTTP_STATUS_CODES.SUCCESS).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			blog,
		});
	} catch (error: any) {
		log.error(error);
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
            log.error(`Blog with id ${id} not found`);
			return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
				message: RESPONSE_MESSAGES.NOT_FOUND,
			});
		}
		return res.status(HTTP_STATUS_CODES.NO_CONTENT).json({
			message: RESPONSE_MESSAGES.SUCCESS,
		});
	} catch (error: any) {
		log.error(error);
		return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
			message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};

export const searchBlogs = async (req: Request, res: Response) => {
	const { q } = req.query;
	try {
        if (!q || typeof q !== "string") {
            log.error(`Missing required fields`);
			return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
				message: RESPONSE_MESSAGES.BAD_REQUEST,
			});
		}
		const blogs = await blogsService.search(q);
        if (!blogs || blogs.length === 0) {
            log.error(`No blogs found`);
			return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
				message: RESPONSE_MESSAGES.NOT_FOUND,
			});
		}
		return res.status(HTTP_STATUS_CODES.SUCCESS).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			blogs,
		});
	} catch (error: any) {
		log.error(error);
		return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
			message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
		});
	}
};
