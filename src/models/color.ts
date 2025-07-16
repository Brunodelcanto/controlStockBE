import mongoose, {Schema, Document, Types} from "mongoose";

export interface Color extends Document {
    name: string;
}

const colorSchema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const Color = mongoose.model<Color>("Color", colorSchema);

export default Color;