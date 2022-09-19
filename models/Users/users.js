const mongoose = require("mongoose");
const schema = mongoose.Schema;

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
  friends: [
    {
      friend_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      dateCreated: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model("users", UserSchema);
