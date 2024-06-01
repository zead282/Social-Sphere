import { auth } from '../../middlewares/auth.middleware.js';
import * as usercontroller from './user.controller.js';
import { Router } from 'express';
import { endPointsRoles } from './user.endpoints.roles.js';
import expressAsyncHandler from 'express-async-handler';
import { multerMiddleLocal } from '../../middlewares/multer.js';
import { allowedExtensions } from '../../utils/allowedExtensions.js';

const router=Router();

router.put('/update',auth(endPointsRoles.use),usercontroller.updateaccount);
router.get('/',auth(endPointsRoles.use),expressAsyncHandler(usercontroller.getUserProfile))
router.delete('/delete',auth(endPointsRoles.use),expressAsyncHandler(usercontroller.deleteAccount))


export default router;