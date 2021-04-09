import {Router} from 'express';
import todoListRoutes from './todoListRoutes';
import {getWorkspace, getWorkspaceById, createWorkspace, patchWorkspace, deleteWorkspace} from '../controllers/workspaceController';
import { getTodoListByBoard, getTodoListByBoardAndTodoListId } from '../controllers/todoListController';
import { validateJWT } from '../middlewares/validatorsControllers';


const router = Router();



//ENDPOINT FOR DEVELOPMENT
router.get('/',validateJWT, getWorkspace);
router.get('/:id', getWorkspaceById);
router.post('/', validateJWT, createWorkspace);
router.patch('/', patchWorkspace);
router.patch('/', deleteWorkspace);

//ENDPOINTS FOR PRODUCTION


// router.get('/:workspaceId/todoLists',  todoListRoutes);

router.use(validateJWT);
router.get('/:board/todoList', getTodoListByBoard);
router.get('/:board/todoList/:todoListId', getTodoListByBoardAndTodoListId);



export default router;