const express = require('express');
const authRouter = express.Router();
//local modules
const {getLoginPage,getLoginSucessPage,getLogout} = require('../controllers/authController');
//core modules
authRouter.get("/login",getLoginPage);
authRouter.post("/login",getLoginSucessPage);
authRouter.post("/logout",getLogout);
module.exports = authRouter;