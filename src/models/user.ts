import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
}

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model<User>("User", userSchema);

export default User;