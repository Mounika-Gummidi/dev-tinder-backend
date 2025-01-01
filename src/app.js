const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const User = require("./models/user");
const app=express();

//posting the data to user collection in database
app.post("/signup", async (req,res) => {

  //instance for user collection
  const user = new User({
    firstName: "virat",
    lastName: "kohili",
    email: "virat@gmail.com",
    password: "virat123@",
    age: "32",
    gender: "male",
  });
  //save
  try{
    await user.save();
      //response
    res.send("data added succesfully");
  }
  catch(err){
    res.status(500).send("something is fishy!")
  }
 
});

//after connection established
connectDB().then(()=>{
  console.log("connection succesfully established");

  // ----including callback function
  app.listen(6666,()=>{
    console.log("we are successfully listening inside on port 6666...");
  });

}).catch((err)=>{
  console.error("connection is not established");
});

