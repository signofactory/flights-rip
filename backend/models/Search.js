const { Schema, model } = require("mongoose");

const Search = new Schema({
  origin: String,
  destination: String,
  departureDate: {
    type: String, 
    required: true
  },
  returnDate: {type: String, required: false},
  price: {
    type: Number,
    default: 100
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  }
}, {
  timestamps: true
});

model("searches", Search);