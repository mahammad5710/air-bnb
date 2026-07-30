const db = require('../utils/databaseUtil');
module.exports = class House {
  constructor(home, photo, price, location, rating, description) {
    this.home = home;
    this.photo = photo;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.description = description;
    this.id=this.id;
  }
save() {
  if (this.id) {
    // Editing existing home
    return db.execute(
      `UPDATE homes 
       SET home=?, photo=?, price=?, location=?, rating=?, description=?
       WHERE id=?`,
      [
        this.home,
        this.photo,
        this.price,
        this.location,
        this.rating,
        this.description,
        this.id
      ]
    );
  } 
  else {
    // Adding new home
    return db.execute(
      `INSERT INTO homes 
       (home, photo, price, location, rating, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        this.home,
        this.photo,
        this.price,
        this.location,
        this.rating,
        this.description
      ]
    );
  }
}
  static fetchAll() {
    return db.execute('Select * FROM homes');
  }
  static findById(homeId) {
    return db.execute('Select * FROM homes where id=?',[homeId]);
  }
  static deleteHome(homeId) {
    return db.execute('delete  FROM homes where id=?',[homeId]);
  }
}