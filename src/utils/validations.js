const validator = require("validator");


const validateSignUpData = (req) => {
  console.log("Request Body: ", req.body);
  const {firstName,lastName,email,password} = req.body;

  if(!firstName || !lastName)
  {
    throw new Error("enter the name");
  }
  else if(!validator.isEmail(email))
  {
    throw new Error("please enter a valid email");
  }
  else if(!validator.isStrongPassword(password))
  {
    throw new Error("please enter a strong password");
  }
};

module.exports = {validateSignUpData};