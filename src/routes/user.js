const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const {userAuth} = require("../middlewares/auth");

userRouter.get("/user/requests/received",userAuth, async (req,res)=>{
  try
  {
    const loggedInUser = req.user;
    console.log(loggedInUser)
    const connectionRequests = await ConnectionRequest.find({
      toUserId:loggedInUser._id,
      status:"intrested",
    }).populate("fromUserId",["firstName","lastName","gender","skills","about","age"]);
    
    res.json({message:"data fetched successfully",data:connectionRequests,});
  }
  catch(err)
  {
    return res.status(400).send("ERROR:" +err.message);
  }
});

userRouter.get("/user/connections",userAuth, async (req,res)=>{
  try
  {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or:[
        {fromUserId:loggedInUser._id,status:"accepted"},
        {toUserId:loggedInUser._id,status:"accepted"},
      ],
    }).populate("fromUserId",["firstName","lastName","gender","skills","about","age"])
      .populate("toUserId",["firstName","lastName","gender","skills","about","age"]);

    const data = connectionRequests.map((row)=>{
      if(row.fromUserId._id.toString() === loggedInUser._id.toString())
      {
        return row.toUserId;
      }
      return row.fromUserId;
    })

    res.json({message:"data fetched successfully..",data});
  }
  catch(err)
  {
    res.status(400).send("ERROR:"+err.message);
  }
} )
module.exports = userRouter;