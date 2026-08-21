const House = require('../models/homes');
const User = require('../models/user');
exports.getHomePage = (req, res, next) => {
  House.find().then((regHouses) => {
    res.render('store/home-list', { regHouses, pageTitle: "Home", isLoggedIn: req.isLoggedIn, user: req.session.user });
  }).catch(err => {
    console.log("Error while readig from database", err);
  })
};
exports.getBookingPage = (req, res, next) => {
  House.find().then((regHouses) => res.render('store/bookings', { regHouses, pageTitle: "bookings", isLoggedIn: req.isLoggedIn, user: req.session.user }));;
};
exports.getFavouritePage = async (req, res, next) => {
  const userId=req.session.user._id;
  const  user = await User.findById(userId).populate('favourites');
  res.render('store/favourite', { favHouses: user.favourites, pageTitle: "favourite", isLoggedIn: req.isLoggedIn, user: req.session.user });
};
exports.getAirbnbPage = (req, res, next) => {
  const regHouses = House.find().then((regHouses => res.render('store/index', { regHouses, pageTitle: "airbnb", isLoggedIn: req.isLoggedIn, user: req.session.user })));;
};
exports.getDetailsPage = (req, res, next) => {
  const homeId = req.params.houseid;
  House.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found error");
      res.redirect('/home');
    }
    else {
      res.render('store/detail', { home, pageTitle: "home", isLoggedIn: req.isLoggedIn, user: req.session.user });
    }
  }).catch(err => {
    console.log("error while detailing the page", err);
  })
}
exports.addToFavouritePage = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect('/favourite');
}
exports.getRemoveFav =async (req, res, next) => {
  const homeId = req.params.houseid;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(user.favourites.includes(homeId)){
    user.favourites=user.favourites.filter(fav=>fav != homeId);
    await user.save();
  }
  res.redirect('/favourite');
}