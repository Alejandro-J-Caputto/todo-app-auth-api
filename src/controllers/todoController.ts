
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

  const {todo, todoList, user } = req.body;
  const newTodo = new Todo({todo, todoList, user});
  await newTodo.save();


  res.status(200).json({
    status:'success',
    newTodo
  })

}
export const patchTodo = (req: Request, res:Response, next: NextFunction) => {

  res.status(200).json({
    status:'success',
    message: 'Hello from todolist'
  })

}
export const deleteTodo = (req: Request, res:Response, next: NextFunction) => {

  res.status(200).json({
    status:'success',
    message: 'Hello from todolist'
  })

}