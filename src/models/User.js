import mongoose from "mongoose";
const { Schema } = mongoose

let User;

if (mongoose.model.User) {
    User = mongoose.model("User");
} else {
    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        }
    })
    User = mongoose.model("User", userSchema)
}

export default User