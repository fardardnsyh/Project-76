const app = require('./index')
require('./DBConection/DBConected')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const port = process.env.PORT 
app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port}`)
})