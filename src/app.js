const express = require("express");
const {connectDB} = require("./config/database");
const app=express();
const cookies = require("cookie-parser");
const authRouter = require("./routes/auth1");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(cors({
  origin:"http://localhost:5173/",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials:true,
}));
app.use(express.json());

app.use(cookies());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


//after connection established
connectDB().then(()=>{
  console.log("connection succesfully established");

  // ----including callback function
  app.listen(7777,()=>{
    console.log("we are successfully listening inside on port 7777...");
  });

}).catch((err)=>{
  console.error("connection is not established");
});

