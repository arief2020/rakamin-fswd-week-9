const express = require('express')
const dotenv = require('dotenv')
const pool = require('./config/query')
const router = require('./router/route')

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 5000

app.use(router)

pool.connect((err, res)=> {
    if (err) {
        console.log(err)
    }
    console.log('Database Connected')
})

app.listen(port, ()=>{
    console.log(`app running in port ${port}`)
})
