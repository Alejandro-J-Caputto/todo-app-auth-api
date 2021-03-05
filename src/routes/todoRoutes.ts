import {Router} from 'express';
import {
  getTodo,
  getTodoById,
  createTodo,
  patchTodo,
  deleteTodo
} from '../controllers/todoController';

const router = Router();


router.get('/', getTodo)
router.get('/:id', getTodoById)
router.post('/', createTodo)
router.patch('/:id', patchTodo)
router.delete('/:id', deleteTodo)




export default router;