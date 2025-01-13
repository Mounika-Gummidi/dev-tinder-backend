const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validations");

profileRouter.get("/profile/view",userAuth,async (req,res)=>{
  try{
      const user = req.user;
      
      res.send(user);
    }
    catch(err)
    {
      res.status(402).send("problem in profile from catch")
    }


});

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
  try
  {
    if(!validateEditProfileData(req)){
      throw new Error("invalid edit request");
    }
    const loggedInUser=req.user;

    Object.keys(req.body).forEach(key=>{loggedInUser[key]=req.body[key]});
    await loggedInUser.save();
    res.json({message:`${loggedInUser.firstName} ,profile updated succesfully...`,data: loggedInUser,});

  }
  catch(err)
  {
    res.status(400).send("issue inside profileEdit");
  }

}); 


module.exports = profileRouter;