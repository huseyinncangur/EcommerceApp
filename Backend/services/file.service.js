const multer = require("multer");


const stroge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now + "-" + file.originalname)
    }
});

const upload = multer({storage:stroge});

module.exports = upload;