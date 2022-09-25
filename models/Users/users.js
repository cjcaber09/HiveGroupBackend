const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Friends = require("./friends");
const UserSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  contact_details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contacts",
  },
  profile_details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profiles",
  },
  address_details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  profile_image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "image-profiles",
  },
  friendLists: [{ type: mongoose.Schema.Types.ObjectId, ref: Friends }],
});

module.exports = mongoose.model("users", UserSchema);
