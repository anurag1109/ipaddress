const mongoose = require("mongoose");

const cityschema = mongoose.Schema({
  ip: { type: String },
  city: { type: String, default: "delhi" },
  region: { type: String, default: "delhi" },
});

const city = mongoose.model("city", cityschema);
module.exports = { city };
