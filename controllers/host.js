const House = require('../models/homes');
exports.getAddHomePage = (req, res, next) => {
  res.render('host/edit-home', { pageTitle: "add-Home", editing: false });
};
exports.getSucessPage = (req, res, next) => {
  const { home, photo, price, location, rating, description } = req.body;

  const house = new House({ home, photo, price, location, rating, description });

  house.save().then(() => {
    console.log('Home saved sucessfully');
  });
  res.redirect('/host/host-list');
};
exports.getHostListPage = (req, res, next) => {
  House.find().then((regHouses) => res.render('host/host-list', { regHouses, pageTitle: "host-list" }));;
};
exports.getEditHomePage = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  House.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found");
      res.redirect('/host/host-list');
    }
    else {
      console.log(homeId, editing, home);
      res.render('host/edit-home', { home, pageTitle: "edit-home", editing });
    }
  })
};
exports.getEditSucessPage = (req, res, next) => {

  const { _id, home, photo, price, location, rating, description } = req.body;

  House.findById(_id)
    .then((house) => {

      house.home = home;
      house.price = price;
      house.location = location;
      house.rating = rating;
      house.photo = photo;
      house.description = description;

      return house.save();

    })
    .then((result) => {
      console.log("Home updated successfully");
      res.redirect("/host/host-list");
    })
    .catch(err => {
      console.log("Error while updating home", err);
    });
};
exports.getDeleteSucessPage = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("This is deleting homes id", homeId);
  House.findByIdAndDelete(homeId).then(() => {
    res.redirect('/host/host-list');
  }).catch(err => {
    console.log("Error while deleting", err);
  })
}