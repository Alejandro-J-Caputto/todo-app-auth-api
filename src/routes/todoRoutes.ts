import {Router} from 'express';
import {
  getTodo,
  getTodoById,
  createTodo,
  patchTodo,
  deleteTodo,
  patchTodoDone,
  dragDropTodo
} from '../controllers/todoController';
import { validateJWT } from '../middlewares/validatorsControllers';

const router = Router();


router.get('/', getTodo)
router.get('/:id', getTodoById)
router.post('/', validateJWT, createTodo)
router.patch('/:id',validateJWT, patchTodo)
router.patch('/:id/:todoListID',validateJWT, dragDropTodo);
router.get('/isDone/:id',validateJWT, patchTodoDone)
router.delete('/:id', deleteTodo)




export default router;