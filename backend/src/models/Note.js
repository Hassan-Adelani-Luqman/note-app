import mongoose from "mongoose";

//first: create a shema
//second: create a model from that schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true
    }
}, {timestamps: true})

const Note = mongoose.model("Note", noteSchema)
export default Note