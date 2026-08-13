const express = require('express');
//local modules
const { getAddHomePage, getSucessPage, getHostListPage, getEditHomePage, getEditSucessPage, getDeleteSucessPage } = require('../controllers/host');
const hostRouter = express.Router();
hostRouter.get("/add-home", getAddHomePage);
// app.use(bodyparser.urlencoded);
hostRouter.post("/add-home", getSucessPage);
hostRouter.get("/host-list", getHostListPage);
hostRouter.get("/edit-home/:homeId", getEditHomePage);
hostRouter.post("/edit-home", getEditSucessPage);
hostRouter.post("/delete-home/:homeId", getDeleteSucessPage);
module.exports = hostRouter;