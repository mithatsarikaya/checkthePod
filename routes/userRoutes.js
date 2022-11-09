const router = require('express').Router()
const userController = require('../controllers/userController')
const {requireAuth} = require('../middlewares/authMiddleware')


router.get('/', userController.loginIndex)
router.get('/add',requireAuth, userController.userAddGet)
router.post('/add',requireAuth, userController.userAddPost)
router.post('/post', userController.loginPost)
router.get('/logout', userController.logoutGet)


module.exports = router