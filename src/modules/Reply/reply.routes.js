
import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { endPointsRoles } from "./reply.endpoints.roles.js";
import * as replycontroller from './reply.controller.js';
import expressAsyncHandler from "express-async-handler";
const router=Router()

router.post('/add/:replyonid',auth(endPointsRoles.ADD_REPLY),replycontroller.addreply);
router.post('/likeunlike/:replyid',auth(endPointsRoles.LIKE_REPLY),expressAsyncHandler(replycontroller.likeunlikereply));
export default router;