import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps : true});

// Create the model
const Todos = mongoose.model("todos", TodoSchema);

export default Todos;
