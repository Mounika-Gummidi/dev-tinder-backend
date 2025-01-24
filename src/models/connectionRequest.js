const mongoose = require("mongoose");
const connectionRequest = require("../routes/request");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status:{
    type:String,
    required:true,
    enum:{
      values:["ignored","intrested","accepted","rejected"],
      message:`{VALUE} is not a valid`,
    },
  },
},
{
  timestamps:true,
});

connectionRequestSchema.index({fromUserId:1,toUserId:1});
connectionRequestSchema.pre("save",function (next) {
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
      throw new Error("you cannot send request to yourself..");
    }
  next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;