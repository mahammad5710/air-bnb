const House = require('../models/homes');
const Favourite=require('../models/favourites');
exports.getHomePage = (req, res, next) => {
  House.fetchAll().then(([regHouses]) => {
    res.render('store/home-list', { regHouses, pageTitle: "Home" })
    }).catch(err => {
      console.log("Error while readig from database", err);
    })
};
exports.getBookingPage = (req, res, next) => {
  House.fetchAll().then(([regHouses]) => res.render('store/bookings', { regHouses, pageTitle: "bookings" }));;
};
exports.getFavouritePage= (req, res, next) => {
  Favourite.GetFavourites(favourite=>{
    House.fetchAll().then(([regHouses]) =>{
      const favHouses=regHouses.filter(home=>favourite.includes(home.id));
      res.render('store/favourite', { favHouses, pageTitle: "favourite" });
    });
  })
};
exports.getAirbnbPage= (req, res, next) => {
  const regHouses = House.fetchAll(regHouses => res.render('store/index', { regHouses, pageTitle: "airbnb" }));;
};
exports.getDetailsPage=(req,res,next)=>{
  const homeId=req.params.houseid;
  House.findById(homeId).then(([homes])=>{
    const home=homes[0];
    if(!home){
      console.log("Home not found error");
      res.redirect('/home');
    }
    else{
      res.render('store/detail', { home,pageTitle: "home" });
    }
  }).catch(err=>{
    console.log("error while detailing the page",err);
  })
}
exports.addToFavouritePage=(req,res,next)=>{
  Favourite.addToFavourite(req.body.id,err=>{
    if(err){
      console.log("Error while adding to favourites",err);
    }
    res.redirect('/favourite');
  });
}
exports.getRemoveFav=(req,res,next)=>{
  const houseId=req.params.houseid;
  console.log("This is unfav",houseId);
  Favourite.deleteFavourite(houseId,err=>{
    if(err){
      console.log("Error while removing from favourites");
    }
    res.redirect('/favourite');
  })
}