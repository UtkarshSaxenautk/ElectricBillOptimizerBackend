const mongoose = require('mongoose');

const HourReportSchema = new mongoose.Schema({
    hour: {
        type: 'number', 
        required: true,
    },
    message: {
        type: 'string',
        required: true,
    },
    suggestedhour: [
        {
            name: {
                type: 'string',
                required: false,
            },
            id: {
                type: 'number',
                required: false,
            },
            time: {
                type: 'string',
                required: false,
            }
        }
    ],
    suggestedBrands: [{
            name: {
                type: 'string',
                required: false,
            },
            power: {
                type: 'number',
                required: false,
            },
            brand: {
                type: 'string',
                required: false,
            }
    }
    ]
})

const HourReport = mongoose.model('hourreport', HourReportSchema)
module.exports  = HourReport;
