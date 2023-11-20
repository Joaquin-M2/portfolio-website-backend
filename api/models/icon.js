const mongoose = require("mongoose");

const iconSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Image", iconSchema);
