//External modules
const express=require('express');
const dns=require('dns');
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])
const session=require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH="mongodb+srv://harismahammad710_db_user:m25GSURXaQh90fP1@cluster0.pkfqf1c.mongodb.net/airbnb?appName=Cluster0";
//local modules
const storeRouter=require('./routes/storeRouter');
const hostRouter=require('./routes/hostRouter');
const authRouter=require('./routes/authRouter');
const {getErrorPage}=require('./controllers/errors');
const rootDir=require('./utils/pathUtil');
//core modules
const path=require('path');
// const {mongoConnect} = require('./utils/databaseUtil');
const { default: mongoose } = require('mongoose');
const app=express();

app.set('view engine','ejs');
app.set('views','views');  // optional it is default
app.use(express.static(path.join(rootDir,'public')));
const store=new MongoDBStore({
  uri:DB_PATH,
  collection:'sessions'
})
app.use(session({
  secret:"Haris@071005#",
  resave:false,
  saveUninitialized:true,
  store:store
}))
app.use(express.urlencoded());
app.use((req,res,next)=>{
  req.isLoggedIn=req.session.isLoggedIn || false;
  next();
})
app.use(storeRouter);
app.use(authRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect('/login');
  }
})
app.use("/host",hostRouter);
app.use(getErrorPage);
const PORT=7777;
mongoose.connect(DB_PATH).then(()=>{
  console.log("Connected to database......");
  app.listen(PORT,()=>{
  console.log(`server is running on adress:http://localhost:${PORT}`);
  })
}).catch((err)=>{
  console.log("Error while connecting to database!",err);
});
