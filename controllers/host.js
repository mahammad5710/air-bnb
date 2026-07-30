const House = require('../models/homes');
exports.getAddHomePage = (req, res, next) => {
  res.render('host/edit-home', { pageTitle: "add-Home",editing:false});
};
exports.getSucessPage = (req, res, next) => {
  const { home, photo, price, location, rating, description } = req.body;

  const house = new House(home, photo, price, location, rating, description);

  house.save()
    .then(() => {
      res.redirect('/host/host-list');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Failed to save house");
    });
};
exports.getHostListPage= (req, res, next) => {
  House.fetchAll().then(([regHouses]) => res.render('host/host-list', { regHouses, pageTitle: "host-list" }));;
};
exports.getEditHomePage = (req, res, next) => {
  const homeId=req.params.homeId;
  const editing=req.query.editing === 'true';
  House.findById(homeId).then(([homes])=>{
    const home=homes[0];
    if(!home){
      console.log("Home not found");
      res.redirect('/host/host-list');
    }
    else{
      console.log(homeId,editing,home);
      res.render('host/edit-home', { home,pageTitle: "edit-home" ,editing});
    }
  })
};
exports.getEditSucessPage = (req, res, next) => {
  const { id, home, photo, price, location, rating, description } = req.body;

  const house = new House(home, photo, price, location, rating, description, id);

  house.save()
    .then(() => {
      res.redirect('/host/host-list');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getDeleteSucessPage=(req,res,next)=>{
  const homeId=req.params.homeId;
  console.log("This is deleting homes id",homeId);
  House.deleteHome(homeId).then(()=>{
    res.redirect('/host/host-list');
  }).catch(err=>{
    console.log("Error while deleting",err);
  })
}