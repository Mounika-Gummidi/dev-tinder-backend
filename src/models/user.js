const mongoose = require("mongoose");
const validator= require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 50,
    index:true,
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
    validate(value)
    {
      if(!validator.isEmail(value))
      {
        throw new Error("invalid user email address");
      }
    },
  },
  password: {
    type: String,
    required:true,
    trim:true,
    validate(value)
    {
      if(!validator.isStrongPassword(value))
      {
        throw new Error("please enter a strong password:" + value);
      }
    },
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
    default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
    validate(value){
      if(!validator.isURL(value))
      {
        throw new Error("invalid photo URL");
      }
    },
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

userSchema.methods.getJWT = async function () {
  const user = this;
    //creating an token
  const token= await jwt.sign({_id:user._id},"mouni@devtinder$",{expiresIn:"1d"});
  return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user =this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}
//model
module.exports = mongoose.model("User",userSchema);

                // -require
                // -schema
                // -model
                // -export