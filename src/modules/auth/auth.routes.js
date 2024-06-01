import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import * as authcontroller from './auth.controller.js'
import { validationmiddleware } from "../../middlewares/validation.middleware.js";
import { singupschema } from "../User/user.validationSchemas.js";
const router=Router();

router.post('/',validationmiddleware(singupschema),expressAsyncHandler(authcontroller.signUp));
router.get('/verify-email',expressAsyncHandler(authcontroller.verifyemail));

router.get('/login',expressAsyncHandler(authcontroller.SignInHandeler))

export default router;