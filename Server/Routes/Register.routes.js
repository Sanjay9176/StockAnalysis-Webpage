const jwt = require('jsonwebtoken');
const { RegisterUser, Loginuser, Updateprofilephoto, Removeprofilephoto, LiveStock, Dropdown} = require('../Controller/Register.controller')
const { verifytoken, upload } = require('../Middleware/Auth.lexpo');
const { OfflineAnalysis } = require('../Controller/OfflineAnalysis.controller');
const RegisterRouter = require('express').Router()
const SecuredRouter = require('express').Router()
const LiveStockRouter = require('express').Router()
const DropdownRoutes = require('express').Router()
RegisterRouter.post('/register', RegisterUser)
RegisterRouter.post('/login', Loginuser)
const OfflineStockRouter = require('express').Router()
SecuredRouter.get('/discovery', verifytoken, (req, res) => {
    res.send({ status: 1, msg: "Access granted", user: req.user })
})
RegisterRouter.post('/profilephoto', verifytoken, upload.single('profileimage'),Updateprofilephoto);
RegisterRouter.delete('/removephoto', verifytoken, Removeprofilephoto);
LiveStockRouter.get('/',verifytoken,LiveStock)
DropdownRoutes.get('/api/symbols',verifytoken,Dropdown)
OfflineStockRouter.get('/:symbol',verifytoken,OfflineAnalysis)
module.exports = { RegisterRouter, SecuredRouter,LiveStockRouter,DropdownRoutes,OfflineStockRouter}