const Pods = require('../models/pods')


const podsIndex = async (req,res)=>{
    const pods = await Pods.find().sort({updatedAt:-1})
    const token = req.cookies.jwt
    if(token || pods.length !== 0){
        res.render('index', {header: 'Ana Sayfa', pods: pods}) 
    }
    else{
      res.redirect('login')
    }

    /* pods.length !== 0 ? res.render('index', {header: 'Ana Sayfa', pods: pods}) 
    : res.redirect('addDeletePod') */
}

 const podTakeGet = (req,res)=>{
   const id = req.params.id
   Pods.findById(id)
   .then((result)=>{
       res.render('podTake', {header:'Pod Detay', pod:result})
   })
   .catch((err)=>{
       console.log(err);
   })

}

const podPutGet = (req,res)=>{
   const id = req.params.id
   Pods.findById(id)
   .then((result)=>{
       res.render('podPut', {header:'Pod Detay', pod:result})
   })
   .catch((err)=>{
       console.log(err);
   })

}

const podUpdatePost = async (req,res)=>{
   const id = req.params.id
   
   if ((req.body.productRawAmount < 0 || req.body.productRawAmount === null) ||
    (req.body.podTotalWeight < 0 || req.body.podTotalWeight === null)){
      console.log('kayıt başarısız');
   }else{
      Pods.findByIdAndUpdate(id, req.body)
      .then(()=>{
      res.json({link:'/'})
   })
   }
}


const podResetGet = async (req,res)=>{
    const id = req.params.id
    
    if ((req.body.productRawAmount < 0 || req.body.productRawAmount === null) ||
     (req.body.podTotalWeight < 0 || req.body.podTotalWeight === null)){
       console.log('kayıt başarısız');
    }else{
       Pods.findByIdAndUpdate(id, {
        productRawAmount : 0,
        podTotalWeight : 0
       })
       .then(()=>{
       res.redirect('/')
    })
    }
 }
 


const podDelete = async (req,res)=>{
   const id = req.params.id
   await Pods.findByIdAndDelete(id)
      .then(() => {
      res.json({link:'/addDeletePod'})
  })
      .catch((err) => {
      console.log(err);
  })
}

 module.exports = {
    podsIndex,
    podTakeGet,
    podPutGet,
    podUpdatePost,
    podResetGet,
    podDelete
 }