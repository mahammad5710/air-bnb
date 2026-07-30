//External modules
const express=require('express');
//local modules
const storeRouter=require('./routes/storeRouter');
const hostRouter=require('./routes/hostRouter');
const {getErrorPage}=require('./controllers/errors');
const rootDir=require('./utils/pathUtil');
//core modules
const path=require('path');
const app=express();

app.set('view engine','ejs');
app.set('views','views');  // optional it is default
app.use(express.static(path.join(rootDir,'public')));
app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host",hostRouter);
app.use(getErrorPage);
const PORT=5007;
app.listen(PORT,()=>{
  console.log(`server is running on adress:http://localhost:${PORT}`);
})