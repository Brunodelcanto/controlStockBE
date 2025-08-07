import mongoose, {Schema, Document} from "mongoose";

export interface Color extends Document {
    name: string;
    isActive?: boolean;
}

const colorSchema = new Schema(
    {
        name: { type: String, unique: true, required: true },
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

const Color = mongoose.model<Color>("Color", colorSchema);

export default Color;