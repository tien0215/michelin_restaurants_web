const mongoose = require("mongoose");
const { Schema } = mongoose;

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  image: String,
  description: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
