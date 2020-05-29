const { Schema, model } = require("mongoose");

const User = new Schema({
  name: String,
  surname: String,
  pictureURL: String,
  googleID: String,
  googleEmail: String,
});

model("users", User);