const express = require('express');
//local modules
const { getAddHomePage, getSucessPage,getHostListPage } = require('../controllers/host');
const hostRouter = express.Router();
hostRouter.get("/add-home", getAddHomePage);
// app.use(bodyparser.urlencoded);
hostRouter.post("/add-home", getSucessPage);
hostRouter.get("/host-list", getHostListPage);
module.exports = hostRouter;