import mongoose from "mongoose";

let User;

if (mongoose.models.User) {
    User = mongoose.model("User");
} else {
    const userSchema = new mongoose.Schema({
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