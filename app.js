const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Pods = require('./models/pods')

const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

mongoose.connect(process.env.DB_URL, ()=>{
    app.listen(process.env.PORT, console.log(`server works on http://localhost:${process.env.PORT}`))
})


/* app.get('/', (req,res)=>{
    const pods = Pods.find()
    .then((result)=>{
        res.render('index', {header: 'Ana Sayfa', pods: result})
    })
    
}) */

app.get('/', async (req,res)=>{
    const pods = await Pods.find()
    console.log(pods.length);
    pods.length !== 0 ? res.render('index', {header: 'Ana Sayfa', pods: pods}) 
    : res.redirect('addPod')
    
    
})

app.get('/podTake/:id', (req,res)=>{
    const id = req.params.id
    Pods.findById(id)
    .then((result)=>{
        res.render('podTake', {header:'Pod Detay', pod:result})
    })
    .catch((err)=>{
        console.log(err);
    })

})


app.get('/podPut/:id', (req,res)=>{
    const id = req.params.id
    Pods.findById(id)
    .then((result)=>{
        res.render('podPut', {header:'Pod Detay', pod:result})
    })
    .catch((err)=>{
        console.log(err);
    })

})


app.get('/addPod', (req,res)=>{
    res.render('addPod', {header: 'Kap Ekle'})
})


app.post('/addPod', (req,res)=>{
    const pod = new Pods(req.body)

    if (pod.podTotalWeight < pod.podFreeWeight || pod.podTotalWeight === null)
    {
        pod.podTotalWeight = pod.podFreeWeight
    }
    pod.save()
        .then(console.log(pod))
        .catch((err)=>{console.log(err)})
    res.redirect('/')

})



app.post('/pod/update/:id', (req,res)=>{
    const id = req.params.id
    console.log(req.body);
    Pods.findByIdAndUpdate(id, req.body)
    .then((result)=>{
        res.json({link:'/'})
    })
})

