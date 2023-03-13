const path = require("path");
const fs = require("fs");

exports.clearImage = (filePath) => {
  console.log("filePath", filePath);
  filePath = path.join(__dirname, "..", filePath);
  console.log("filePath", filePath);
  fs.unlink(filePath, (err) => console.log(err));
  console.log("deleted");
};
