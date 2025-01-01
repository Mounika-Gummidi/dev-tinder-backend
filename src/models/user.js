const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  
});

//model
module.exports = mongoose.model("User",userSchema);

                // -require
                // -schema
                // -model
                // -export