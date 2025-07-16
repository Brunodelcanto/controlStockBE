import mongoose, { Schema, Document, Types } from "mongoose";

export interface Product extends Document {
    name: string;
    amount: number;
    price: number;
    category: Types.ObjectId[];
    color: Types.ObjectId[];
    isActive: boolean;
}

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
        category: { type: [Schema.Types.ObjectId], ref: 'Category', required: true },
        color: { type: [Schema.Types.ObjectId], ref: 'Color', required: true },
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;