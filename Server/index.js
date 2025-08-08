let express = require('express')
let mongoose = require('mongoose')
require('dotenv').config()
let cors = require('cors');
const path = require('path');
const { RegisterRouter, SecuredRouter, LiveStockRouter, DropdownRoutes, OfflineStockRouter } = require('./Routes/Register.routes');
let app = express();
app.use(cors())
app.use(express.json())
app.use('/lexpo/register/', RegisterRouter)
app.use("/lexpo/", SecuredRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.jpg')) {
            res.set('Content-Type', 'image/jpeg');
        } else if (path.endsWith('.png')) {
            res.set('Content-Type', 'image/png');
        }
    }
}));
app.use("/lexpo/LiveAnalysis",LiveStockRouter)
app.use("/",DropdownRoutes)
app.use("/lexpo/OfflineAnalysis",OfflineStockRouter)
mongoose.connect(process.env.DBURL).then(() => {
    console.log("connected to mongodb")
    app.listen(process.env.PORT, () => {
        console.log("Server is running")
    })
}).catch((err) => {
    console.log(err)
})
