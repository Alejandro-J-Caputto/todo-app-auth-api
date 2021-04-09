import {Router} from 'express';

import {uploadImageCloudinary} from '../controllers/uploadsController';
import { validateJWT } from '../middlewares/validatorsControllers';

const router = Router();


// router.put('/:colection/:id', validateJWT, uploadImageCloudinary);
router.post('/:colection', validateJWT, uploadImageCloudinary);

export default router;