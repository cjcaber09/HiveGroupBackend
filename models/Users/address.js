const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = Schema({
  apartment: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("address", AddressSchema);
