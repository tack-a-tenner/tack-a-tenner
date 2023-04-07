const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  moneyboi: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    trim: true,
    validate: {
      validator: function () {
        return !this.moneyboi || !!this.bio;
      },
      message: "Cannot add bio if not a moneyboi",
    },
  },
  skills: [
    {
      type: String,
      trim: true,
      validate: {
        validator: function () {
          return !this.moneyboi || !!this.skills.length;
        },
        message: "Cannot add skills if not a moneyboi",
      },
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

// set up pre-save middleware to create password
profileSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model("Profile", profileSchema);

module.exports = Profile;
