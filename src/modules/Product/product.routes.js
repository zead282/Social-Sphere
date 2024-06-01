import { Router } from "express";
import * as productcontroller from './product.controller.js'
import { auth } from "../../middlewares/auth.middleware.js";
import { endPointsRoles } from "./product.endpoints.roles.js";
import { multerMiddleHost } from "../../middlewares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";

const router=Router();

router.post('/add',auth(endPointsRoles.ADD_PRODUCT),
multerMiddleHost({extensions:allowedExtensions.image}).array('image',2),
expressAsyncHandler(productcontroller.addproduct))


router.put('/update/:productId',auth(endPointsRoles.ADD_PRODUCT),multerMiddleHost({extensions:allowedExtensions.image}).single('image'),
expressAsyncHandler(productcontroller.updateproduct));

router.delete('/delete/:productid',auth(endPointsRoles.delte_product),expressAsyncHandler(productcontroller.deleteproduct))

router.post('/likeunlike/:productId',auth(endPointsRoles.all),expressAsyncHandler(productcontroller.likeOrUnlikeProduct));

router.get('/getlikes/:productid',expressAsyncHandler(productcontroller.getproductlikes));

router.get('/getcomments/:productid',expressAsyncHandler(productcontroller.getcomments));
export default router;