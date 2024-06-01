
import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { endPointsRoles } from "./comment.endpoints.roles.js";
import * as commentcontroller from './comment.controller.js';
import expressAsyncHandler from "express-async-handler";

const router=Router()

router.post('/add/:productId',auth(endPointsRoles.all),commentcontroller.addComment);
router.post('/likeunlike/:commentid',auth(endPointsRoles.all),expressAsyncHandler(commentcontroller.likeorunlikecomment))


export default router;