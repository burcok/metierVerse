import { Router } from "express";

const router = Router();

import * as controller from '../controllers/appControllers.js';
import Auth, { localVariable } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailController.js";


/** Post */
router.route('/register').post(controller.register)
router.route('/registerMail').post(registerMail); //send email
router.route('/authenticate').post((req, res) => res.end()); // auth user
router.route('/login').post(controller.verifyUser, controller.login); // login

/** Get */
router.route('/user/:username').get(controller.getUser); //user with username
router.route('/generateOTP').get(controller.verifyUser, localVariable, controller.generateOTP); // generate otp
router.route('/verifyOTP').get(controller.verifyOTP); // verify otp
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

/** Put */
router.route('/updateUser').put(Auth, controller.updateUser); // update profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); //reset password


export default router;