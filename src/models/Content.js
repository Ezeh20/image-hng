import mongoose from "mongoose";

let Content;

if (mongoose.models.Content) {
    Content = mongoose.model("Content");
} else {
    const dataSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        img: {
            type: String,
            required: true,
            unique: true
        },
        symbol: {
            type: String,
            required: true,
            unique: true
        }
    })
    Content = mongoose.model("Content", dataSchema)
}

export default Content