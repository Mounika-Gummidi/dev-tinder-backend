const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app=express();


//auth middleware
app.use("/admin",adminAuth);

app.get("/admin/getAllData",(req,res)=>{
  res.send("getting all the data");
});

app.get("/admin/deleteData",(req,res)=>{
  res.send("deleting the data");
});


 //user middleware
app.get("/user",userAuth,(req,res)=>{
  res.send("hello user");
});

app.post("/user/login",(req,res)=>{
  res.send("user logged in successfully");
});

// ---listening
// app.listen(3000);

// ----including callback function
app.listen(5555,()=>{
  console.log("we are successfully listening inside on port 5555...");
});

