import {Router} from 'express';
import { deleteUser, getUserById, getUsers, patchPassword, patchUser, postUser, putUser } from '../controllers/userController';
import { checkEmailExists, checkEmailExistsProfile, checkPassword, checkPasswordConfirmation, checkPasswordSimple, checkResetPass, validateJWT } from '../middlewares/validatorsControllers';


const router = Router();


router.get('/',       [],   getUsers)
router.post('/',      [],   postUser)
router.patch('/',      [], validateJWT, checkPasswordSimple, checkEmailExistsProfile, patchUser )
router.patch('/resetPass',      [],validateJWT, checkPassword, checkResetPass,  patchPassword )
router.get('/:id',    [],   getUserById)
router.put('/:id',    [],   putUser)
router.delete('/:id', [validateJWT],   deleteUser)


export default router;