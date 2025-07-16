import { Request, Response } from "express";
import Product from "../../models/product";

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            message: "Product created successfully",
            data: product,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate('category').populate('color');
        res.status(200).json({
            data: products,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

const getProductById = async (req: Request, res: Response) => { 
    try {
        const product = await Product.findById(req.params.id).populate('category').populate('color');
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
            });
        }
        res.status(200).json({
            data: product,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({
                message: "Product not found",
                error: true,
            });
            return;
        } 
            res.status(200).json({
                message: "Product deleted successfully",
                error: false,
            });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "User updated successfully",
            data: product,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message
        });
    }
}

const deactivateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true},
        )
        if (!product) {
            res.status(404).json({
                message: "Product not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Product deactivated successfully",
            data: product,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const activateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true },
        );
        if (!product) {
            res.status(404).json({
                message: "Product not found",
                error: true,
            });
            return;
        };
        res.status(200).json({
            message: "Product activated successfully",
            data: product,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
        
    }
}

const adjustProductStock = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { amount, action } = req.body;

        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({
                message: "Amount must be a positive number",
                error: true,
            });
        }

        if (!["increase", "decrease"].includes(action)) {
            return res.status(400).json({
                message: "Invalid action. Must be 'increase' or 'decrease'",
                error: true,
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
            });
        }

        if (action === "decrease") {
            if (product.amount < parsedAmount) {
                return res.status(400).json({
                    message: "Not enough stock to decrease",
                    error: true,
                });
            }
            product.amount -= parsedAmount;
        } else {
            product.amount += parsedAmount;
        }

        await product.save();

        res.status(200).json({
            message: `Product amount ${action}d successfully`,
            data: product,
            error: false,
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deactivateProduct,
    activateProduct,
    adjustProductStock
}
