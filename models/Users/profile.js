const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProfileSchema = schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
  },
  bday: {
    type: Date,
  },
});

module.exports = mongoose.model("profiles", ProfileSchema);
