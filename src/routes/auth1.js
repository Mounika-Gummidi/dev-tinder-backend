const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validations");
const User = require("../models/user");

//posting the data to user collection in database
authRouter.post("/signup", async (req,res) => {
 
  const{password,firstName,lastName,email,gender,age,photoUrl,about}=req.body;

  //save
  try{
     // validation for signup data
  validateSignUpData(req);

  // encrypt the password i the for of hash
  const passwordHash = await bcrypt.hash(password,10);
  console.log(passwordHash);

  //instance for user collection(never trust the req.body)
  const user = new User({
    firstName,
    lastName,
    email,
    password:passwordHash,
    gender,
    age,
    photoUrl,
    about
  });
    await user.save();
      //response
    res.send("data added succesfully");
  }
  catch(err){
    res.status(500).send("something is fishy!" + err.message)
  }
 
});

//login
authRouter.post("/login",async (req,res)=>{
  try{
    const {email,password} = req.body;
    //verify email present in db or not
    // IMPORTANT
    const user = await User.findOne({email:email});
    if(!user)
    {
      throw new Error("Invalid Credentials");
    }
    //compare passwords
    // IMPORTANT
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid)
    {
      //creating an token
      const token= await user.getJWT();
      res.cookie("token",token,{
        expires:new Date(Date.now() + 7 * 3600000)
      });
      res.send(user);
    }
    else
    {
      throw new Error("Invalid Credentials");
    }
  }
  catch(err){
    res.status(403).send("Login Invalid!"+err.message);
  }

});

//logout
authRouter.post("/logout",async (req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now())
  })
  res.send("Logout Successfull");
})

module.exports = authRouter;