const express = require('express');
//local modules
const { getHomePage, getBookingPage,getFavouritePage,getAirbnbPage,getDetailsPage,addToFavouritePage,getRemoveFav } = require('../controllers/store');
//core modules
const storeRouter = express.Router();
storeRouter.get("/", getAirbnbPage);
storeRouter.get("/home", getHomePage);
storeRouter.get("/bookings", getBookingPage);
storeRouter.get("/favourite", getFavouritePage);
storeRouter.get("/details/:houseid",getDetailsPage);
storeRouter.post("/favourite", addToFavouritePage);
storeRouter.post("/favourite/remove/:houseid",getRemoveFav);
module.exports = storeRouter;