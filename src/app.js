const express = require("express");
const app=express();


// ----how to access the incoming requests


// app.use("/", (req,res)=>{
//   res.send("we are inside use function(/)");
//  });

 app.use("/test", (req,res)=>{
  res.send("we are inside use function(test)");
 });

 app.use("/home", (req,res)=>{
  res.send("we are inside use function(home)");
 });


 app.use((req,res)=>{
  res.send("we are inside use function main");
 });

// ---listening
// app.listen(3000);

// ----including callback function
app.listen(5555,()=>{
  console.log("we are successfully listening inside on port 5555...");
});

