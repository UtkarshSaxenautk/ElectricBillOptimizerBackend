const ShowAppliance = require("../models/appliance.js");
const Hourly = require("../models/hourlyReport.js");
const  User  = require("../models/index.js");
const Appliance = require('../models/item.js');
const { CheckFeasibility, CheckLimit } = require('../helpers/logic.js');


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
        res.status(201).json(CheckFeasibility(user));
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
const sendHourlyReport = async (req, res) => {
    const exist = await Hourly.exists({ id: req.body.id })
    console.log(exist)
   const userdata = await User.findOne({userId:"1"})
    try {
        if (exist !== null) {
            let currusage = await Hourly.findOne({ id: req.body.id })
            console.log(currusage)
            let mongoID = currusage._id
            const addUsage = currusage.usage.power + parseInt(req.body.usage.power);
            var Limit = true
            result = CheckLimit(userdata , currusage, addUsage)
            if (result.value) {
                console.log("Yes got it")
            }
            else {
                console.log("Oops")
                
                Limit = false
            }
            const temp = {power: addUsage , limit: Limit}
            console.log(temp)
            Hourly.findByIdAndUpdate(mongoID, {$set:{usage:temp}}).then(result => {
                console.log('result', result)
            })
            
        }
        else {
            const report = new Hourly(req.body);
            await report.save()
        }
        
        res.status(201).json("Hurray hourly data posted successfully");
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const postShowAppliance = async (req, res) => {
    const showAppliance = new ShowAppliance(req.body);
    try {
        await showAppliance.save();
        res.status(201).json(showAppliance);
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}




module.exports = {readAppliance , writeAppliance , readUser , createUser , sendHourlyReport , postShowAppliance}