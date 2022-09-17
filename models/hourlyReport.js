const mongoose = require('mongoose');


const HourlyReport = new mongoose.Schema({
    id: {
        type: 'number',
        required: true,
    },
    usage: {
        power: {
            type: 'number',
            required: true,
        },
        limit: {
            type: 'boolean',
            required:true,
        }
    },
    // timeSent: {
    //     type: 'Date',
    //     required:true,
    // }
})


const Hourly = mongoose.model('hourly', HourlyReport)
module.exports  =  Hourly