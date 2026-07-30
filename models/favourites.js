//core moduels
const fs = require('fs');
const path = require('path');
//local module
const rootDir = require('../utils/pathUtil');
//path 
const favouriteDataPath = path.join(rootDir, 'data', 'favourites.json');
module.exports = class Favourite {
  static addToFavourite(id, callback) {
    Favourite.GetFavourites(favHouses => {
      if (favHouses.includes(id)) {
        callback("Home exists in favourites");
      }
      else {
        favHouses.push(id);
        fs.writeFile(favouriteDataPath, JSON.stringify(favHouses), callback);
      }
    })
  }
  static GetFavourites(callback) {
    fs.readFile(favouriteDataPath, "utf8", (err, data) => {
      if (err) {
        return callback([]);
      }
      if (!data.trim()) {
        return callback([]);
      }
      callback(JSON.parse(data));
    });
  }
  static deleteFavourite(homeId,callback){
      Favourite.GetFavourites(favs =>{
        const newFav=favs.filter(fav => fav !== homeId);
          fs.writeFile(favouriteDataPath, JSON.stringify(newFav),callback);
      })
    }
};