import mongoose, { Schema } from 'mongoose';

Schema = new mongoose.Schema

const AppliancesSchema = new Schema({
    user : {
        type: 'string',
        required: true,
    },
    total: {
        type: 'number',
        required:true,
    },
    appliances: [
        {
            name: {
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
                required: true
            }
        },
        {
            name: {
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
                required: true
            }
        },
    ]
})

const Appliances = mongoose.model(' Appliances', AppliancesSchema)
export default Appliances