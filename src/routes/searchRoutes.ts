import {Router} from 'express';

import {searchDoc} from '../controllers/searchController'

const router = Router();

router.get('/:colection/:terminus', searchDoc);


export default router;
