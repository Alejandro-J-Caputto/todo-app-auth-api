import {TodoInterface} from '../interfaces/interfaces';

import mongoose, {Schema, model, mongo } from 'mongoose';


const TodoSchema = new Schema({
  id: {
    type: mongo.ObjectID
  },
  todo: {
    type: String,
    required: [true, 'A todo is required'],
    trim: true
  },
  date: {
    type: Date,
    default: new Date().getDate()
  },
  todoList: {
    type: Schema.Types.ObjectId,
    ref: 'TodoList',
    required: [true, 'A todo must belong to a todolist']
  },
  done: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The todolist belongs to an User']
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

const Todo = model<TodoInterface>('Todo', TodoSchema);

export default Todo

