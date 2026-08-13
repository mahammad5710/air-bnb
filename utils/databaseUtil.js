const mongo = require('mongodb');
const dns=require('dns');
const MongoClient = mongo.MongoClient;
const MONGO_URL = "mongodb+srv://harismahammad710_db_user:m25GSURXaQh90fP1@cluster0.pkfqf1c.mongodb.net/?appName=Cluster0";
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL).then(client => {
    // console.log(client);
    _db=client.db("airbnb");
    callback();
  }).catch(err => {
    console.log(err);
  });
}
const getDB = ()=>{
  if(!_db){
    throw new Error("DataBase not connected");
  }
  return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;











// const mysql=require('mysql2');
// const pool=mysql.createPool({
//   host:'localhost',
//   user:'root',
//   password:'Haris@071005',
//   database:'airbnb'
// });
// module.exports=pool.promise();