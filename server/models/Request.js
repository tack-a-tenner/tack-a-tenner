const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const requestSchema = new Schema({
  requestTitle: {
    type: String,
    required: "Your request must have a title",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  requestAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  willExpire: {
    type: Boolean,
    default: false,
  },
  expirationDate: {
    type: Date,
  },
});

// Define a pre-save middleware to set the `requestAuthor` field to the logged-in user's name
requestSchema.pre("save", function (next) {
  // Check if the `requestAuthor` field is already set
  if (this.requestAuthor) {
    return next();
  }
  // Replace `getCurrentUser()` with the function that returns the currently logged-in user's name
  this.requestAuthor = getCurrentUser();
  next();
});

const Request = model("Request", requestSchema);

module.exports = Request;