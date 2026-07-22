const House = require('../models/homes');
exports.getHomePage = (req, res, next) => {
  const regHouses = House.fetchAll(regHouses => res.render('store/home-list', { regHouses, pageTitle: "Home" }));;
};
exports.getBookingPage = (req, res, next) => {
  const regHouses = House.fetchAll(regHouses => res.render('store/bookings', { regHouses, pageTitle: "bookings" }));;
};
exports.getFavouritePage= (req, res, next) => {
  const regHouses = House.fetchAll(regHouses => res.render('store/favourite', { regHouses, pageTitle: "favourite" }));;
};
exports.getAirbnbPage= (req, res, next) => {
  const regHouses = House.fetchAll(regHouses => res.render('store/index', { regHouses, pageTitle: "airbnb" }));;
};
exports.getDetailsPage=(req,res,next)=>{
  const homeId=req.params.houseid;
  console.log("Unique id",homeId);
  res.render('store/detail', { pageTitle: "home" });
}
