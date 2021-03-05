import mongoose, {Schema, model, mongo } from 'mongoose';
import { TodoListInterface } from '../interfaces/interfaces';

const TodoListSchema = new Schema({
  id: {
    type: mongo.ObjectID
  },
  name: {
    type: String,
    required: [true, 'A name fot the current list is required'],
    trim: true
  },
  date: {
    type: Date,
    default: new Date().getDate()
  },
  active: {
    type: Boolean,
    default: true
  },
  // todos: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Todo',
  // }],
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: [true, 'A todolist must belong to a workspace']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The todolist belongs to an User']
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

TodoListSchema.virtual('todos', {
  ref: 'Todo', 
  foreignField: 'todoList',
  localField: '_id'
});


const TodoList = model<TodoListInterface>('TodoList', TodoListSchema);

export default TodoList;