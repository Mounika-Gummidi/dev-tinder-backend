const adminAuth = (req,res,next)=>{
  const token = "XYZ";
  const isAuthorized = token === "XYZ";
  if(!isAuthorized)
  {
    res.status(401).send("unauthorized admin");
  }
  else
  {
    next();
  }
};

const userAuth = (req,res,next)=>{
  const token = "XYZab";
  const isAuthorized = token === "XYZab";
  if(!isAuthorized)
  {
    res.status(401).send("unauthorized user");
  }
  else
  {
    next();
  }
};

module.exports = {adminAuth,userAuth};