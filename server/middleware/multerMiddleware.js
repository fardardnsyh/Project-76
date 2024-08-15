const multer = require('multer')
const DataParser = require('datauri/parser')
const path  = require('path')

//upload image to database
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
          return cb(null, './profile')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
     return cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage });

module.exports = upload ;