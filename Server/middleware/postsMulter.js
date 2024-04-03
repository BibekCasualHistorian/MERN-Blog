const multer = require("multer");
const path = require("path");

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "uploads", "posts")); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const postUpload = multer({ storage: postStorage });

module.exports = postUpload;
