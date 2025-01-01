const mongoose = require("mongoose");
//promise
const connectDB = async ()=>{
  await mongoose.connect("mongodb+srv://mounikagummidi68:sB6Zzjnsd46mcCEv@namastenode.cb7wq.mongodb.net/devTinder");
};

 
module.exports = {connectDB};