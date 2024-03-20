const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
  //tags: { type: [String], required: true },
  iconUrl: { type: String, required: false },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Resource", resourceSchema);
