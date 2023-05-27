import { Router } from "express";

const router = Router();

import * as controller from '../controllers/appControllers.js';



/** Post */
router.route('/register').post(controller.register)
//router.route('/registerMail').post(); //send email
router.route('/authenticate').post((req, res) => res.end()); // auth user
router.route('/login').post(controller.login); // login

/** Get */
router.route('/user/:username').get(controller.getUser); //user with username
router.route('/generateOTP').get(controller.generateOTP); // generate otp
router.route('/verifyOTP').get(controller.verifyOTP); // verify otp
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

/** Put */
router.route('/updateUser').put(controller.updateUser); // update profile
router.route('/resetPassword').put(controller.resetPassword); //reset password


export default router;