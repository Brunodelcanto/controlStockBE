import { Request, Response } from "express";
import Category from "../../models/category";

const createCategory = async (req: Request, res: Response) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({
            message: "Category created successfully",
            data: category,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "Categories retrieved successfully",
            data: categories,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

export {
    createCategory,
    getCategories
}