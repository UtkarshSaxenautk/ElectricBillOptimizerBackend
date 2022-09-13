const  User  = require("../models/index.js");
const Appliance = require('../models/item.js');


const readAppliance = async (req, res) => {
    try {
        const appliance = await Appliance.find({ name: req.params.name });
        res.status(200).send(appliance)
    } catch (err) {
         res.status(404).json({ error: err.message })
    }
}

const writeAppliance = async (req, res) => {
    const appliance = new Appliance(req.body);
    try {
        await appliance.save();
        res.status(201).json("Posted appliance successfully")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
const readUser = async (req, res) => {
    try {
        const users = await User.find({userId: req.params.user_id});
        res.status(200).send(users);
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}
const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json("Hurray userdata posted successfully");
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


module.exports = {readAppliance , writeAppliance , readUser , createUser}