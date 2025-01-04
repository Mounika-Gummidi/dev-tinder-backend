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
    res.status(500).send("something is fishy!" + err.message)
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

//feed api-getting all the users from database
app.get("/feed",async (req,res)=>{
  try{
    const users2 = await User.find({});
    res.send(users2);
  }
  catch(err){
    res.status(402).send("unfortunately all the user not sent");
  }
})

// deleting the user
app.delete("/delete",async (req,res)=>{
  try{
    const users3 = await User.findByIdAndDelete({_id: req.body._id});
    res.send("user deleted succesfully");
  }
  catch(err)
  {
    res.status(403).send("deleting is not done");
  }
})

// update the users
app.patch("/update/:userId",async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
  try{
    
    // limiting the updates
    const Allowed_Updates = ["photoUrl","skills","about","age","gender",];
    const isUpdateAllowed = Object.keys(data).every((k)=>{
      return Allowed_Updates.includes(k);
    });
    if(!isUpdateAllowed)
      {
        throw new Error("update is not allowed");
      }     

    if(req.body.skills.length>10)
    {
      throw new Error("maximum length should be 10");
      
    }

    const user4 = await User.findByIdAndUpdate({_id:userId},data,
      {returnDocument:"After",
        runValidators:true,
      });
    res.send("user updated succesfully");
  }
  catch(err){
    res.status(405).send("update falied!" + err.message);
  }
})

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

