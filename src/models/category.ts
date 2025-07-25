import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
    name: string;
    isActive?: boolean;
}

const CategorySchema: Schema = new Schema(
    {
        name: {type: String},
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model<Category>("Category", CategorySchema);

export default Category;