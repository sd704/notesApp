const mongoose = require("mongoose")
const { noteSchema } = require("./Note")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        notes: [noteSchema]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = { User, userSchema }