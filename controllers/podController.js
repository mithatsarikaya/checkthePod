const Pods = require('../models/pods')


const podsIndex = async (req,res)=>{
    const pods = await Pods.find().sort({updatedAt:-1})
    pods.length !== 0 ? res.render('index', {header: 'Ana Sayfa', pods: pods}) 
    : res.redirect('addPod')
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

   if (req.body.productRawAmount < 0 || req.body.productRawAmount === null){
      console.log('kayıt başarısız');
      // res.json({link:'/'})
   }else{
      Pods.findByIdAndUpdate(id, req.body)
      .then(()=>{
      res.json({link:'/'})
   })
   }

   // console.log(req.body.productRawAmount);
   // console.log(req.body);

   // const podToBeUpdated = await Pods.findById(id)
   // console.log(typeof podToBeUpdated.productRawAmount);
   // console.log(typeof req.body.productRawAmount);

   
}

 module.exports = {
    podsIndex,
    podTakeGet,
    podPutGet,
    podUpdatePost
 }