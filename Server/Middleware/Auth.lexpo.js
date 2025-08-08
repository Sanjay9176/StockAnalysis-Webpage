const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const verifytoken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 0, msg: 'Token not found' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next()
  } catch (err) {
    return res.status(403).json({ status: 0, msg: 'Token is invalid' })
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
})

const upload = multer({ storage })
module.exports = { verifytoken, upload }