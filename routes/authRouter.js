const express = require('express');
const authRouter = express.Router();
//local modules
const {getLoginPage,getLoginSucessPage} = require('../controllers/authController');
//core modules
authRouter.get("/login",getLoginPage);
authRouter.post("/login",getLoginSucessPage);
module.exports = authRouter;