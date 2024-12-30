const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app=express();

//EXCEPTION HANDLING 

// 1. without using try catch
app.get("/user",(req,res)=>{

  throw new Error("sdfgbhnj");
  
  res.send("hello user");
});

app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(402).send("something is fishy");
  }
})

// 2.using try catch(BEST)
app.get("/mouni",(req,res)=>{
  try{
    throw new Error("sdfghj");
    res.send("hello from mounika");
  }
  catch(err){
    res.status(500).send("something went really wrong😐")
  }
})


// ---listening
// app.listen(3000);

// ----including callback function
app.listen(5555,()=>{
  console.log("we are successfully listening inside on port 5555...");
});

