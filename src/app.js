const express = require("express");
const app=express();


// ----how to access the incoming requests

 app.use("/test", (req,res)=>{
  res.send("we are inside use function(test)");
 });

 app.use("/home", (req,res)=>{
  res.send("we are inside use function(home)");
 });

 


//  app.use((req,res)=>{
//   res.send("we are inside use function main");
//  });

  app.get("/user",(req,res)=>{
    res.send("hehehehe get");
  });
  app.post("/user",(req,res)=>{
    res.send("hehehehe posting");
  });
  app.delete("/user",(req,res)=>{
    res.send("deleted");
  });


  app.use("/", (req,res)=>{
    res.send("we are inside use function(/)");
   });
// ---listening
// app.listen(3000);

// ----including callback function
app.listen(5555,()=>{
  console.log("we are successfully listening inside on port 5555...");
});

