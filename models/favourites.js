//core moduels
const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'House',
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Favourite', favouriteSchema);
// module.exports = class Favourite {
//   constructor(home_id) {
//     this.home_id=home_id;
//   }
//   save(){
//     const db=getDB();
//     return db.collection('favourites').findOne({home_id:this.home_id}).then(existingFav=>{
//       if(!existingFav){
//         return db.collection('favourites').insertOne(this);
//       }
//       else{
//         return Promise.resolve();
//       }
//     })
//   }
//   static GetFavourites(callback) {
//     const db=getDB();
//     return db.collection('favourites').find().toArray();
//   }
//   static deleteFavourite(del_id) {
//    const db=getDB();
//    return db.collection('favourites').deleteOne({home_id:del_id});
//   }
// };