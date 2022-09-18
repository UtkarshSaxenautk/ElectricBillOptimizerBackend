const express = require('express');
const controller =  require('../controller/index.js');

const router = express.Router();
router.get('/:user_id', controller.readUser);
router.post('/createUser', controller.createUser);
router.get('/appliance/:name', controller.readAppliance);
router.post('/appliance', controller.writeAppliance);
router.post('/hour', controller.sendHourlyReport)
router.post('/postshowAppliance', controller.postShowAppliance)
router.get('/report/:hourcount', controller.getHourReport)
router.get('/dailyreport/:user_id' , controller.getDailyReport)
module.exports  =  router;