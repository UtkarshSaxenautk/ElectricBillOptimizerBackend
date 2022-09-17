const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: 'string',
        required: true,
    },
    user: {
        type: 'string',
        required: true,
    },
    total: {
        type: 'number',
        required: true,
    },
    appliances: [
        {
            id: {
                type: 'number',
                required:true,
            },
            name: {
                type: 'string',
                required: true,
            },
            brand: {
                type: 'string',
                required: true,
            },
            power: {
                type: 'number',
                required: true,
            },
            expectedhour: {
                type: 'number',
                required: true,
            },
            location: {
                type: 'string',
                required: false
            }
        }
    ],
    bill: {
        type: 'number',
        required: true
    }
})

const User = mongoose.model('appliances', UserSchema)
module.exports  = User;
