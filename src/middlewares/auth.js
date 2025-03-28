const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookies = require("cookie-parser");

const userAuth = async (req,res,next)=>{
 try{
      const {token} = req.cookies;
      if(!token)
      {
       return res.status(401).send("Please Login");
      }
      const decodedMessage = await jwt.verify(token,"mouni@devtinder$");
      const{_id}=decodedMessage;
      const user = await User.findById(_id);
      if(!user)
      {
        throw new Error("please login..");
      }

      req.user = user;
      next();
    }
    catch(err)
    {
      res.status(400).send("Error:"+ err.message);
    }
};

module.exports = {userAuth};