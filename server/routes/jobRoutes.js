const express = require('express')
const authControler = require('../controler/authControler')
const jobControler = require("../controler/jobControler")
const routes = express.Router()



routes.route('/').get(authControler.protect,jobControler.getAllJob).post(authControler.protect,jobControler.createJob)
routes.route('/stats').get(authControler.protect,jobControler.ShowStatus)
routes.route('/:id').get(authControler.protect,jobControler.getJob).patch(authControler.protect , jobControler.updateJob).delete(authControler.protect, jobControler.deleteJob)

module.exports = routes