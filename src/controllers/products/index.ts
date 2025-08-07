import { Request, Response } from "express";
import Product from "../../models/product";
import Category from "../../models/category";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, variants } = req.body;

        const existingProduct = await Product.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') } 
        });

        if (existingProduct) {
            return res.status(400).json({
                message: "Product with this name already exists",
                error: true,
            });
        }

        const colorIds = variants.map((v: any) => v.color.toString());
        const duplicateColors = new Set(colorIds).size !== colorIds.length;

        if (duplicateColors) {
            return res.status(400).json({
                message: "Duplicate color variants are not allowed",
                error: true,
            });
        }

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
        const products = await Product.find().populate('category')
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
        const product = await Product.findById(req.params.id).populate('category')
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
            message: "Product updated successfully",
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
    const { colorId, amount, action } = req.body; 

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", error: true });
    }

    const variant = product.variants.find(v => v.color.toString() === colorId);
    if (!variant) {
      return res.status(404).json({ message: "Color not found in product", error: true });
    }

    if (action === "decrease") {
      if (variant.amount < amount) {
        return res.status(400).json({ message: "Not enough stock", error: true });
      }
      variant.amount -= amount;
    } else if (action === "increase") {
      variant.amount += amount;
    } else {
      return res.status(400).json({ message: "Invalid action", error: true });
    }

    await product.save();
    res.status(200).json({ message: "Stock updated", data: product });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductByCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id)

        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
            });
            return;
        }
        const products = await Product.find({ category: id }).populate('variants.color').populate('category');
        res.status(200).json({
            message: "Products obtained successfully",
            data: products,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const searchProductsByName = async (req: Request, res: Response) => {
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({
            error: true,
            message: "Invalid or missing 'name' query parameter"
        })
    }

    try {
        const products = await Product.find({
            name: { $regex: name, $options: "i"}
        });
        res.status(200).json({
            message: "Products obtained successfully",
            data: products,
            error: false,
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
}


export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deactivateProduct,
    activateProduct,
    adjustProductStock,
    getProductByCategory,
    searchProductsByName
}
