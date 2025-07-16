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

export {
    createColor,
    getColors
}