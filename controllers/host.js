const House = require('../models/homes');
exports.getAddHomePage = (req, res, next) => {
  res.render('host/addHomeget', { pageTitle: "add-Home" });
};
exports.getSucessPage = (req, res, next) => {
  const { home, photo, price, location, rating, description } = req.body;
  const house = new House(home, photo, price, location, rating, description);
  house.save();
  res.render('host/addHomePost', { pageTitle: "sucess" });
};
exports.getHostListPage= (req, res, next) => {
  const regHouses = House.fetchAll(regHouses => res.render('host/host-list', { regHouses, pageTitle: "host-list" }));;
};