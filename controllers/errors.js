exports.getErrorPage=(req,res,next)=>{
  res.status(404).render('error',{pageTitle:"error-page",isLoggedIn:req.isLoggedIn, user:req.session.user});
};