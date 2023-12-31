import mongoose from "mongoose";

let User;

if (mongoose.models.User) {
    User = mongoose.model("User");
} else {
    const userSchema = new mongoose.Schema({
        name: {
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