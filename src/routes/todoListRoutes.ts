import {Router} from 'express';
import {
  getTodoList,
  getTodoListById,
  createTodoList,
  patchTodoList,
  deleteTodoList,
  getTodoListByBoard,
  getTodoListByBoardAndTodoListId
} from '../controllers/todoListController'
import { validateJWT } from '../middlewares/validatorsControllers';

const router = Router({mergeParams: true});


router.get('/', getTodoList);
router.get('/:id', getTodoListById);
router.post('/', validateJWT, createTodoList);
router.patch('/:id', validateJWT, patchTodoList);
router.delete('/:id', deleteTodoList);


// router.get('/:board/todoList', getTodoListByBoard);
// router.get('/:board/todoList/:todoListId', getTodoListByBoardAndTodoListId);

export default router;