import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    completed: boolean;
}

const TodoSchema: Schema = new Schema({
    title:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps: true});

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;