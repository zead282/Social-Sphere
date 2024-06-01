import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { endPointsRoles } from "./like.endpoints.roles.js";
import * as likecontroller from './likes.controller.js';
import expressAsyncHandler from "express-async-handler";
const router=Router()

router.post('/:likeDoneOnId',auth(endPointsRoles.LIKE),expressAsyncHandler(likecontroller.likeorunlike));


export default router;