import {Router} from 'express';
import { deleteUser, getUserById, getUsers, postUser, putUser } from '../controllers/userController';
import { validateJWT } from '../middlewares/validatorsControllers';


const router = Router();


router.get('/',       [],   getUsers)
router.post('/',      [],   postUser)
router.get('/:id',    [],   getUserById)
router.put('/:id',    [],   putUser)
router.delete('/:id', [validateJWT],   deleteUser)


export default router;