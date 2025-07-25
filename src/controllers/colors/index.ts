import { Request, Response } from "express";
import Color from "../../models/color";

const createColor = async (req: Request, res: Response) => {
    try {
        const color = new Color(req.body);
        await color.save();
        res.status(201).json({
            message: "Color created successfully",
            data: color,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getColors = async (req: Request, res: Response) => {
    try {
        const colors = await Color.find();
        res.status(200).json({
            message: "Colors retrieved successfully",
            data: colors,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getColorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const color = await Color.findById(id);
        if (!color) {
            res.status(404).json({
                message: "Color not found",
                error: true,
            });
        }
        res.status(200).json({
            message: "Fetched successfully",
            data: color,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const deleteColor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const color = await Color.findByIdAndDelete(id);
        if (!color) {
            res.status(404).json({
                message: "Color not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Color deleted successfully",
            data: color,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
}

const updateColor = async (req: Request , res: Response) => {
    try {
        const { id } = req.params;
        const color = await Color.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            { new: true }
        );
        if (!color) {
            res.status(404).json({
                message: "Color not found",
                error: true,
            })
            return;
        }
        res.status(200).json({
            message: "Color updated successfully",
            data: color,
            error:false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const deactivateColor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const color = await Color.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true},
        )
        if (!color ) {
            res.status(404).json({
                message: "Color not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Color deactivated successfully",
            data: color,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const activateColor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const color = await Color.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true },
        );
        if (!color) {
            res.status(404).json({
                message: "Color not found",
                error: true,
            });
            return;
        };
        res.status(200).json({
            message: "Color activated successfully",
            data: color,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
        
    }
}


export {
    createColor,
    getColors,
    getColorById,
    deleteColor,
    updateColor,
    deactivateColor,
    activateColor
}