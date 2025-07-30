import mongoose, { Schema, Document, Types } from "mongoose";

interface ColorVariant {
    color: mongoose.Types.ObjectId;
    amount: number;
    colorName?: string
}

export interface Product extends Document {
    name: string;
    category: Types.ObjectId;
    price: number;
    variants: ColorVariant[];
    isActive: boolean;
}

const productSchema = new Schema(
    {
        name: { type: String, required: true, unique: true},
        price: { type: Number, required: true, min: 0 },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        variants : [
            {
                color: { type: Schema.Types.ObjectId, ref: 'Color', required: true },
                amount: { type: Number, required: true, min: 0 }
            }
        ],
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)


const Product = mongoose.model<Product>("Product", productSchema);

export default Product;