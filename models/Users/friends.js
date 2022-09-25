const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = Schema({
  requestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  requested: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});
FriendSchema.pre("remove", function (next) {
  console.log(this);
});
module.exports = mongoose.model("friendlists", FriendSchema);
