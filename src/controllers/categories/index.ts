import { Request, Response } from "express";
import Category from "../../models/category";
import { truncate } from "node:fs/promises";

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

const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } =  req.params;
        const category = await Category.findById(id);
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
            });
        }
        res.status(200).json({
            message: "Category fetched successfully",
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

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
            });
            return;
        } 
            res.status(200).json({
                message: "Category deleted successfully",
                error: false,
            });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") },
            _id: { $ne: id }
        });

        if (existingCategory) {
            res.status(400).json({
                message: "Category with this name already exists",
                error: true,
            });
            return;
        }

        const category = await Category.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            { new: true }
        );
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Category updated successfully",
            data: category,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
}

const deactivateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true },
        )
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
            });
            return
        }
        res.status(200).json({
            message: "Category deactivated successfully",
            data: category,
            error: false,  
        })
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
}

const activateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true },
        )
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
            });
            return
        }
        res.status(200).json({
            message: "Category activated successfully",
            data: category,
            error: false,  
        })
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
}

export {
    createCategory,
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
    deactivateCategory,
    activateCategory
}