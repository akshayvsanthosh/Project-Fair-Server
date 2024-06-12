const express = require('express')
const userController = require('../Contollers/userController')

const router = new express.Router()

// register : http://localhost:3000/register
router.post('/register',userController.registerController)

// login : http://localhost:3000/login
router.post('/login',userController.loginController)



module.exports = router