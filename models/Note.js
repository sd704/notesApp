const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            unique: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = { Note, noteSchema }