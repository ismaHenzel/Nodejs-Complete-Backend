import express from 'express';
import UserController from './Controllers/UserController.js';
import Signin from "./Controllers/signUpController.js"
import LoginController from './Controllers/LoginController.js';
import verifyJwtRoute from './verify/verifyJwtLogin.js';
import verifyJwtEmail from './verify/verifyJwtEmail.js';
import ForgotPassword from "./Controllers/ForgotPassword.js";
import MainController from './Controllers/MainRouteController.js';
import EmailController from "./Controllers/EmailController.js"
import authEmail from './Controllers/authEmail.js';

const router = express.Router();

router.get("/mainRoute",MainController.show);
router.post("/verifyToken", verifyJwtRoute.verify);
router.post("/updateUser",verifyJwtRoute.verify,UserController.update);
router.post("/deleteUser",verifyJwtRoute.verify,UserController.destroy);

router.post("/sendEmail/:route",EmailController.send);
router.get("/verifyEmail/:id",verifyJwtEmail.verify,authEmail.update);
router.get("/forgotPassword/:id",verifyJwtEmail.verify,ForgotPassword.update);

router.post("/createAccount", Signin.store);
router.post("/login", LoginController.verify);
router.get("/logout", function(req, res){
    return res.status(200).send({auth: true, token: null})
})


export default router;
