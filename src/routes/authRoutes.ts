import {Router} from 'express';
import { login, logOut, singIn, renewToken } from '../controllers/authController';
import {check} from 'express-validator';
import { checkEmailExists, checkPasswordConfirmation, validateFields, validateJWT, } from '../middlewares/validatorsControllers';

const router = Router();


router.post('/login', 
  // check('email', 'the email is required').isEmail(),
  // check('password', 'the password is required').not().isEmpty(),
  // validateFields,
  login);
router.post('/register',
  check('name', 'The name is required').not().isEmpty(),
  check('email', 'the email is required').isEmail(),
  check('password', 'the password is required').not().isEmpty(),
  check('passwordConfirm', 'the passwordConfirm is required').not().isEmpty(),
  checkPasswordConfirmation,
  checkEmailExists,
  validateFields, 
singIn);

router.get('/checkToken', validateJWT, renewToken);

router.get('/logout', logOut);



export default router;