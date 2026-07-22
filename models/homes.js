//core moduels
const fs = require('fs');
const path = require('path');
//local module
const rootDir = require('../utils/pathUtil');
//fake database
module.exports = class House {
  constructor(home, photo, price, location, rating, description) {
    this.home = home;
    this.photo = photo;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.description = description;
  }
  save() {
    this.id=Math.random().toString();
    House.fetchAll(regHouses => {
      regHouses.push(this);
      const homeDataPath = path.join(rootDir, 'data', 'homes.json');
      fs.writeFile(homeDataPath, JSON.stringify(regHouses), error => {
        console.log("file Writing concluded", error);
      });
    })
  }
  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'data', 'homes.json');
    fs.readFile(homeDataPath, (err, data) => {
      console.log("file read: ", err, data);
      if (!err) {
        callback(JSON.parse(data));
      }
      else {
        callback([]);
      }
    })
  }
}