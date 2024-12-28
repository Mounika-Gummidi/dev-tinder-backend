const express = require("express");
const app=express();

app.get("/ab?c",(req,res)=>{
  res.send({firstname:"mounika",lastname:"gummidi"});
});
app.get("/ab+c",(req,res)=>{
  res.send({firstname:"mounika",lastname:"gummidi"});
});
app.get("/ab*cd",(req,res)=>{
  res.send({firstname:"mounika",lastname:"gummidi"});
});
app.get("/a(bd)?ce",(req,res)=>{
  res.send({firstname:"mounika",lastname:"gummidi"});
});


//regular expressions
app.get(/a/,(req,res)=>{
  res.send({firstname:"kavya",lastname:"gummidi"});
});
app.get(/.*fly$/,(req,res)=>{
  res.send({firstname:"kavya",lastname:"gummidi"});
});


//we commonly see urls
app.get("/user/:userid/:name/:password",(req,res)=>{
  res.send({firstname:"sarada",lastname:"gummidi"});
});
app.get("/user",(req,res)=>{
  console.log(req.query);
  res.send({firstname:"sarada",lastname:"gummidi"});
});


// ---listening
// app.listen(3000);

// ----including callback function
app.listen(5555,()=>{
  console.log("we are successfully listening inside on port 5555...");
});

