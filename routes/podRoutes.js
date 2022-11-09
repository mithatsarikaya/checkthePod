const router = require('express').Router()
const podController = require('../controllers/podController')
const {requireAuth} = require('../middlewares/authMiddleware')


router.get('/', podController.podsIndex)
router.get('/Take/:id', requireAuth,podController.podTakeGet)
router.get('/Put/:id', requireAuth,podController.podPutGet)
router.post('/update/:id', requireAuth,podController.podUpdatePost)
router.delete('/Delete/:id', requireAuth,podController.podDelete)




module.exports = router