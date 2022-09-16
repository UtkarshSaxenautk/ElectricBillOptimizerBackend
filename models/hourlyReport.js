const mongoose = require('mongoose');


const HourlyReport = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    hoursUsed: [{
        hour: {
            type: 'number',
            required: true,
        },
    }
    ],
    timeSent: {
        type: 'Date',
        required:true,
    }
})


const Hourly = mongoose.model('hourly', HourlyReport)
module.exports  =  Hourly