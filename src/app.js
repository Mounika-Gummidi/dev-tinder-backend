const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app=express();

//EXCEPTION HANDLING 

app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(402).send("something is fishy1111");
  }
});

// 1. without using try catch
app.get("/user",(req,res)=>{

  throw new Error("sdfgbhnj");
  
  res.send("hello user");
});

app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(402).send("something is fishy2222");
  }
});


// ---listening
// app.listen(3000);

// ----including callback function
app.listen(5555,()=>{
  console.log("we are successfully listening inside on port 5555...");
});

