const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AddressSchema = new schema({
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

module.exports = mongoose.model("addresses", AddressSchema);
