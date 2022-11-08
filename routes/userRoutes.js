const router = require('express').Router()
const userController = require('../controllers/userController')


router.get('/', userController.loginIndex)
// router.post('/add', userController.userAddPost)
router.post('/post', userController.loginPost)
router.get('/logout', userController.logoutGet)


module.exports = router