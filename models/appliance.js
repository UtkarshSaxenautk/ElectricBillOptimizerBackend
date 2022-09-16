const mongoose = require('mongoose');


const ShowApplianceSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required:true,
    },
    brand: {
        type: 'string',
        required:true,
    },
    quantity: {
        type: 'number',
        required:true,
    },
    powerconsumption: {
        type: 'number',
        required:true,
    }
})


const ShowAppliance = mongoose.model('showappliance', ShowApplianceSchema)
module.exports  =  ShowAppliance