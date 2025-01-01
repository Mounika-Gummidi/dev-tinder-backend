const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const app=express();


//after connection established
connectDB().then(()=>{
  console.log("connection succesfully established");

  // ----including callback function
  app.listen(5555,()=>{
    console.log("we are successfully listening inside on port 5555...");
  });

}).catch((err)=>{
  console.error("connection is not established");
});

