import mongoose, { Schema } from 'mongoose';

Schema = new mongoose.Schema

const AppliancesSchema = new Schema({
    total : {
        type: 'integer',
        required: true,
    },
    applainces: [
        {
            name: {
                type: 'string',
                required: true,
            },
            consumption: {
                type: 'integer',
                required: true,
            }
        }
    ]
})

const Appliances = mongoose.model(' Appliances', AppliancesSchema)
export default Appliances