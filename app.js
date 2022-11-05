const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Pods = require('./models/pods')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

mongoose.connect(process.env.DB_URL, ()=>{
    app.listen(process.env.PORT, console.log(`server works on http://localhost:${process.env.PORT}`))
})


app.get('/', (req,res)=>{
    res.render('index', {header: 'Ana Sayfa'})
})


app.get('/addPod', (req,res)=>{
    res.render('addPod', {header: 'Kap Ekle'})
    
})



app.post('/addPod', (req,res)=>{
    const pod = new Pods(req.body)
    pod.save()
        .then(console.log(pod))
})

