import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
    name: string;
}

const CategorySchema: Schema = new Schema(
    {
        name: {type: String},
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model<Category>("Category", CategorySchema);

export default Category;