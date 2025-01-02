const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const {connectDB} = require("./config/database");
const User = require("./models/user");
const app=express();

app.use(express.json());
//posting the data to user collection in database
app.post("/signup", async (req,res) => {
  // //instance for user collection
  const user = new User(req.body);
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


//get the user by email
app.get("/user",async (req,res)=>{
   const userEmail = req.body.email;
   try{
    const users = await User.find({email: userEmail});
    res.send(users);
   }
   catch(err){
    res.status(402).send("userEmail is not present/ there is an issue");
   }
})

//getting all the users from database
app.get("/feed",async (req,res)=>{
  try{
    const users2 = await User.find({});
    res.send(users2);
  }
  catch(err){
    res.status(402).send("unfortunately all the user not sent");
  }
})



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

