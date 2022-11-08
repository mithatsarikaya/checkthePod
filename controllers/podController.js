const Pods = require('../models/pods')


const podsIndex = async (req,res)=>{
    const pods = await Pods.find().sort({updatedAt:-1})
    pods.length !== 0 ? res.render('index', {header: 'Ana Sayfa', pods: pods}) 
    : res.redirect('addDeletePod')
    
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
   
   console.log(req.body);

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

const podDelete = async (req,res)=>{
   console.log(req.body);
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
    podDelete
 }