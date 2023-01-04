const express=require('express')
const router =express.Router()
const authController=require('../controllers/authController')
router.post('/',auth.Login)
module.exports=router;