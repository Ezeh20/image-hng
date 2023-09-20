import mongoose from "mongoose";

let Data;

if (mongoose.models.Data) {
    Data = mongoose.model("Data");
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
    Data = mongoose.model("Data", dataSchema)
}

export default Data