
import { NextFunction, Request, Response } from "express";
import Todo from '../models/todo';


export const getTodo = async(req: Request, res:Response, next: NextFunction) => {

  const todos = await Todo.find();

  res.status(200).json({
    status:'success',
    todos
  })

}
export const getTodoById = async (req: Request, res:Response, next: NextFunction) => {

  res.status(200).json({
    status:'success',
    message: 'Todo created sucesfully',
    
  })

}
export const createTodo = async (req: Request, res:Response, next: NextFunction) => {

  const {todo, todoList, uid } = req.body;
  const newTodo = new Todo({todo, todoList, user:uid});
  await newTodo.save();


  res.status(200).json({
    status:'success',
    newTodo
  })

}
export const patchTodo = async (req: Request, res:Response, next: NextFunction) => {
  const {id} = req.params;
  const {todo} = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(id, {todo:todo}, {new: true, runValidators: true})

  res.status(200).json({
    status:'success',
    updatedTodo
  })

}

export const dragDropTodo = async (req: Request, res:Response, next: NextFunction) => {
  const {id, todoListID} = req.params;
  
  const updatedTodo = await Todo.findByIdAndUpdate(id, {todoList:todoListID}, {new: true, runValidators: true})

  res.status(200).json({
    status:'success',
    updatedTodo
  })

}
export const patchTodoDone = async (req: Request, res:Response, next: NextFunction) => {
  const {id} = req.params;
  const todoDone = await Todo.findById(id);

  if(!todoDone) {
    return new Error('There is not a todo with the provided id')
  }
  if(todoDone.done) {
    todoDone.done = false;
  } else {
    todoDone.done = true;
  }

  await todoDone.save()
  res.status(200).json({
    status:'success',
    message: `Todo status changed to ${todoDone.done}`,
    todoDone
  })

}
export const deleteTodo = (req: Request, res:Response, next: NextFunction) => {

  res.status(200).json({
    status:'success',
    message: 'Hello from todolist'
  })

}