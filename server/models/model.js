import mongoose, { model, Schema } from 'mongoose';

const noteSchema = new Schema({
    name:String,
    content:String,
    category:String,
})

const Note= model("Note", noteSchema);

export default Note