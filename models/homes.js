const mongoose = require('mongoose');
const houseSchema = new mongoose.Schema({
  home: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photo: String,
  description: String
});
/*
houseSchema.pre('findOneAndDelete', async function (next) {
  const homeId = this.getQuery()["_id"];
  await Favourite.deleteMany({ homeId: homeID });
  next();
})
  */
module.exports = mongoose.model('House', houseSchema);
