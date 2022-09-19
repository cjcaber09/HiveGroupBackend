const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = Schema({
  phone: {
    type: String,
    require: true,
  },
  work: {
    type: String,
  },
  home: {
    type: String,
  },
  telephone: {
    type: String,
  },
});

module.exports = mongoose.model("contacts", ContactSchema);
