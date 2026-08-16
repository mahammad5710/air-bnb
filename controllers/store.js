const House = require('../models/homes');
const Favourite = require('../models/favourites');
exports.getHomePage = (req, res, next) => {
  House.find().then((regHouses) => {
    res.render('store/home-list', { regHouses, pageTitle: "Home", isLoggedIn: req.isLoggedIn })
  }).catch(err => {
    console.log("Error while readig from database", err);
  })
};
exports.getBookingPage = (req, res, next) => {
  House.find().then((regHouses) => res.render('store/bookings', { regHouses, pageTitle: "bookings", isLoggedIn: req.isLoggedIn }));;
};
exports.getFavouritePage = (req, res, next) => {
  Favourite.find().populate('houseId').then(favourites => {
    const favHouses = favourites.map(fav => fav.houseId);
    res.render('store/favourite', { favHouses, pageTitle: "favourite", isLoggedIn: req.isLoggedIn });
  });
};
exports.getAirbnbPage = (req, res, next) => {
  const regHouses = House.find().then((regHouses => res.render('store/index', { regHouses, pageTitle: "airbnb", isLoggedIn: req.isLoggedIn })));;
};
exports.getDetailsPage = (req, res, next) => {
  const homeId = req.params.houseid;
  House.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found error");
      res.redirect('/home');
    }
    else {
      res.render('store/detail', { home, pageTitle: "home", isLoggedIn: req.isLoggedIn });
    }
  }).catch(err => {
    console.log("error while detailing the page", err);
  })
}
exports.addToFavouritePage = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId }).then((ext) => {
    if (ext) {
      return res.redirect("/favourite");
    }
    const fav = new Favourite({ houseId: homeId });
    return fav.save();
  }).then(() => {
    res.redirect("favourite");
  }).catch((err) => {
    console.log("Error while adding to favourites");
  })
}
exports.getRemoveFav = (req, res, next) => {
  const homeId = req.params.houseid;
  console.log("This is unfav", homeId);
  Favourite.findOneAndDelete({ houseId: homeId }).then(result => {
    console.log("fav removed sucessfully", result);
  }).catch(err => {
    console.log("Error while removing from favourites", err);
  }).finally(() => {
    res.redirect('/favourite');
  })
}