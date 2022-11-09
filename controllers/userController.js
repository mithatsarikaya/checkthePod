const Users = require('../models/users')
const jwt = require('jsonwebtoken')

const maxAge = 60*60*24

const createToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: maxAge})
}

const loginIndex = (req,res) => {
    res.render('login', {header:"login"})
}

const loginPost = async (req,res) =>{
    const {username, password} = req.body
    try{
        const user = await Users.login(username,password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000})
        res.redirect('/')
    }
    catch(e){
        console.log(e);
        res.redirect('/')
    }
}

const logoutGet = (req,res) =>{
    res.cookie('jwt', '', {maxAge:1})
    res.redirect('/')
}


const userAddPost = (req,res) => {
    console.log(req.body);
    new Users(req.body).save()
        .then(res.redirect('/'))
        .catch((err) => {
            console.log('giris hatasi')
            res.redirect('/login');
        })
}

const userAddGet = (req,res) => {
    res.render('signin', {header:"Kayit"})
}





module.exports ={
    userAddPost,
    userAddGet,
    loginIndex,
    loginPost,
    logoutGet
}