const express = require('express');
const authRouter = express.Router();
//local modules
const {getLoginPage,getLoginSucessPage,getLogout,getSignUpPage,getSignUpSucessPage} = require('../controllers/authController');
//core modules
authRouter.get("/login",getLoginPage);
authRouter.post("/login",getLoginSucessPage);
authRouter.post("/logout",getLogout);
authRouter.get("/signup",getSignUpPage);
authRouter.post("/signup",getSignUpSucessPage);
module.exports = authRouter;