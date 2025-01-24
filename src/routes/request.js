const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req,res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    // validations
    const allowedStatus = ["intrested","ignored"];
    if(!allowedStatus.includes(status))
    {
       return res.status(400).send({message:"allowedStatus must be only intrested or ignored"});
    }
    const toUser = await User.findOne({_id: toUserId});
    if(!toUser)
    {
      return res.status(400).send({message:"the requesting person is not even present in database"})
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
          {fromUserId,toUserId},
          {fromUserId:toUserId, toUserId:fromUserId},
      ],
    });
    if(existingConnectionRequest)
    {
     return res.status(400).send({message:"connectionRequest already exists"});
    }


    //instance 
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.json({
      message:req.user.firstName+" "+status+" "+toUser.firstName,
      data,
    });
  }
  catch(err)
  {
    return res.status(400).send("issue inside connectionRequest:"+err.message);
  }
});

module.exports = requestRouter;