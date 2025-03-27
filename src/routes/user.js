const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const {userAuth} = require("../middlewares/auth");
const { toString } = require("validator");
const User = require("../models/user");

userRouter.get("/user/requests/received",userAuth, async (req,res)=>{
  try
  {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId:loggedInUser._id,
      status:"intrested",
    }).populate("fromUserId",["firstName","lastName","gender","skills","about","age","photoUrl"]);
    
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
    }).populate("fromUserId",["firstName","lastName","gender","skills","about","age","photoUrl"])
      .populate("toUserId",["firstName","lastName","gender","skills","about","age","photoUrl"]);

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
} );

userRouter.get("/feed",userAuth, async (req,res)=>{
  try 
  {
    const loggedInUser = req.user;
    const page=parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; 
    const skip= (page-1)*limit;
    //finding all the connection requests
    const connectionRequests = await ConnectionRequest.find({
      $or:[
        {fromUserId: loggedInUser._id},
        {toUserId: loggedInUser._id},
      ],
    }).select("fromUserId toUserId");

    //hiding the users
    // const hideUserFromFeed = new Set();
    // connectionRequests.forEach((req)=>{
    //   hideUserFromFeed.add(req.fromUserId.toString()),
    //   hideUserFromFeed.add(req.toUserId.toString())
    // });
    //remaining users
    const users = await User.find({
      $and:[
        // {_id: {$nin: Array.from(hideUserFromFeed)}},
        {_id:{$ne:loggedInUser._id}},
      ],
    }).select().skip(skip).limit(limit);
    // console.log(connectionRequests);
    res.json(users);
  } 
  catch (err) 
  {
    res.status(400).send("ERROR:"+err.message);
  }
})
module.exports = userRouter;