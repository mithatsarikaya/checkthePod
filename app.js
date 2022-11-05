const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DB_URL, ()=>{
    app.listen(process.env.PORT, console.log(`server works on http://localhost:${process.env.PORT}`))
})


app.get('/', (req,res)=>{
    res.sendFile('./views/index.html', {root: __dirname})
})


app.use(express.static('public'))
