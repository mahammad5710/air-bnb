exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', { pageTitle: "login",isLoggedIn:false});
};
exports.getLoginSucessPage = (req, res, next) => {
  console.log(req.body);
  // req.isLoggedIn=true;
  // res.cookie('isLoggedIn',true);
  req.session.isLoggedIn=true;
  res.redirect('/');
};
exports.getLogout = (req, res, next) => {
  req.session.destroy(()=>{
    res.redirect('/login');
  })
};

