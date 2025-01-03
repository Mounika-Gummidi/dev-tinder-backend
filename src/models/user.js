const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required:true,
    trim:true,
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 50,
    trim:true,
  },
  email: {
    type: String,
    lowercase:true,
    unique:true,
    required:true,
    trim:true,
  },
  password: {
    type: String,
    required:true,
    trim:true,
  },
  age: {
    type: Number,
    min:18,
    max:80,
    trim:true,
  },
  gender: {
    type: String,
    required: true,
    trim:true,
    validate(value){
      if(!["male","female","others"].includes(value))
      {
        throw new Error("gender data is not valid");
      }
    },
    
  },
  photoUrl:{
    type: String,
    default: "https://i0.wp.com/www.aalayamdesigns.com/wp-content/uploads/2018/05/dummy-woman.jpg?ssl=1",
  },
  about:{
    type: String,
    default:"this is the default about of the user!",
  },
  skills:{
    type: [String],
    
  }
  
},
{
  timestamps:true,
});

//model
module.exports = mongoose.model("User",userSchema);

                // -require
                // -schema
                // -model
                // -export