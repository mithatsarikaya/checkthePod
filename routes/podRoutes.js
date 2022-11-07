const router = require('express').Router()
const podController = require('../controllers/podController')


router.get('/', podController.podsIndex)
router.get('/Take/:id', podController.podTakeGet)
router.get('/Put/:id', podController.podPutGet)
router.post('/update/:id', podController.podUpdatePost)




module.exports = router