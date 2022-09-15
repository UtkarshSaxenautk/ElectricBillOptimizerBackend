const mongoose = require('mongoose');


const ApplianceSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required:true,
    },
    brands: [
        {
            title: {
                type: 'string',
                required:true,
            },
            consumption: {
                type: 'number',
                required:true,
            }
        } 
    ]
})


const Appliance = mongoose.model('appliance', ApplianceSchema)
module.exports  =  Appliance