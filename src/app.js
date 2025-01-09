const express = require("express");
const { userAuth } = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validations");
const app=express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");

app.use(express.json());
app.use(cookies());
//posting the data to user collection in database
app.post("/signup", async (req,res) => {
 
  const{password,firstName,lastName,email,gender}=req.body;

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
app.post("/login",async (req,res)=>{
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
      res.send("Login Successfull...");
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

app.get("/profile",userAuth,async (req,res)=>{
  try{
      const user = req.user;
      
      res.send(user);
    }
    catch(err)
    {
      res.status(402).send("problem in profile from catch")
    }


});



//after connection established
connectDB().then(()=>{
  console.log("connection succesfully established");

  // ----including callback function
  app.listen(7777,()=>{
    console.log("we are successfully listening inside on port 6666...");
  });

}).catch((err)=>{
  console.error("connection is not established");
});

