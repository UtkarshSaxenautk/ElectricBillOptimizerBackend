const express = require('express');
const controller =  require('../controller/index.js');

const router = express.Router();
router.get('/:user_id', controller.readUser);
router.post('/', controller.createUser);
router.get('/appliance/:name', controller.readAppliance);
router.post('/appliance', controller.writeAppliance);
module.exports  =  router;