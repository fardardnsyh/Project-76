//import all require library
const express = require('express')
const bodyparser   = require('body-parser')
const cors = require('cors')
const morgon = require('morgan')
const helmet = require('helmet')
const mangoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const path  = require('path')
//Start APP  Middleware
const app = express()

//cors  Middleware
app.use(cors());
app.use('*', cors())
app.use(express.json());
//Bodyparser  Middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(helmet({crossOriginResourcePolicy:false}))
app.use(morgon('dev'))
//sanitezer the data after the cashed are full non sql query injects 
app.use(mangoSanitize())
//protect against HTTP Parameter Pollution attacks
app.use(hpp())
//File path 
app.use(express.static("./public"))
app.use("/profile", express.static('./profile'));

//CALL OR IMPORT ROUTES Area
const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')



//All ROUTES START HERE 
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/jobs', jobRoutes);

module.exports = app