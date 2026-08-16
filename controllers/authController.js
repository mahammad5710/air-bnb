exports.getLoginPage = (req, res, next) => {
  res.render('auth/login', { pageTitle: "login"});
};
exports.getLoginSucessPage = (req, res, next) => {
  console.log(req.body);
  req=isLoggedI=true;
  res.redirect('/');
};
