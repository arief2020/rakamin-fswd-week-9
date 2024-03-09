const express = require('express')
const dotenv = require('dotenv')
const pool = require('./config/query')
const router = require('./router/route')
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 5000

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.use(errorHandler)

pool.connect((err, res)=> {
    if (err) {
        console.log(err)
    }
    console.log('Database Connected')
})

app.listen(port, ()=>{
    console.log(`app running in port ${port}`)
})
