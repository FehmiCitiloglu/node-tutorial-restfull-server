const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    console.log("false1");
    return next();
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (error) {
    console.log(error);
    req.isAuth = false;
    console.log("false2");
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    console.log("false3");
    return next();
  }

  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
