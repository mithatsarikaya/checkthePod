const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Pods = require('./models/pods')
const cookieParser = require('cookie-parser')
const podRoutes = require('./routes/podRoutes')
const userRoutes = require('./routes/userRoutes')
const {requireAuth, checkUser} = require('./middlewares/authMiddleware')


const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))

mongoose.connect(process.env.DB_URL, ()=>{
    app.listen(process.env.PORT, console.log(`server works on http://localhost:${process.env.PORT}`))
})

app.use(cookieParser())

app.get('*',checkUser)

app.get('/', (req,res)=>{
    console.log(req);
    res.redirect('pod')    
})


app.use('/pod', podRoutes)
app.use('/login',userRoutes)


app.get('/addDeletePod', (req,res)=>{
    Pods.find()
        .then((result) => {
            res.render('addDeletePod', {header: 'Kap Ekle', pods: result})
        })
})


app.post('/addDeletePod', (req,res)=>{
    const pod = new Pods(req.body)

    if (pod.podTotalWeight < pod.podFreeWeight || pod.podTotalWeight === null)
    {
        pod.podTotalWeight = pod.podFreeWeight
    }
    pod.save()
        .then(res.redirect('/'))
        .catch((err)=>{console.log(err)})
    
})

