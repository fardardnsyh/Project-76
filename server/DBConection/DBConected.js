const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DBURL)
.then(db => console.log("Database is conected"))
.catch(error=> console.log("Database not conected", error))