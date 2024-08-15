const express = require('express')
const authControler = require('../controler/authControler')
const userControler = require('../controler/userControler')
const  upload   = require('../middleware/multerMiddleware')
const routes = express.Router()

//authControler Routes for New User Signup and login
routes.route('/sigup').post(authControler.signUp);
routes.route('/login').post(authControler.login);
routes.get('/logout', authControler.logout);


routes.get('/currentUser', authControler.protect , authControler.getCurrentUser)
routes.get('/applicationStatus', authControler.protect, userControler.getApplicationStats)
routes.patch('/updateUser', authControler.protect, upload.single('avatar'), userControler.updateUser)


module.exports = routes