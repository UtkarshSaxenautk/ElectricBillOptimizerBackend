const ShowAppliance = require("../models/appliance.js");
const Hourly = require("../models/hourlyReport.js");
const  User  = require("../models/index.js");
const Appliance = require('../models/item.js');
const { CheckFeasibility, CheckLimit, Recommend_by_item, Alternate } = require('../helpers/logic.js');
const HourReport = require("../models/ReportHour.js");
const { Hourreport , DailyReport} = require("../sdk/twilio.js");


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

const getHourReport = async (req, res) => {
    try {
        const report = await HourReport.find({hour: req.params.hourcount});
        res.status(200).send(report);
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}

var countHour = 0;

const sendHourlyReport = async (req, res) => {
    countHour++;
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
            result = CheckLimit(userdata, currusage, addUsage)
            var flag = true 
            if (result.value) {
                console.log("Yes got it")

            }
            else {
                flag = false
                var curr_usage_of_all = [];
                for (let i = 0; i < userdata.appliances.length; i++){
                    const curr_id = userdata.appliances[i].id;
                    const curr_hourly_report = await Hourly.findOne({ id: curr_id })
                    if (curr_hourly_report !== null) {
                        curr_usage_of_all.push({ "id": curr_id, "usage": curr_hourly_report.usage })
                    }
                   
                }
                //const curr = {id : req.body.id  , usage : req.body.usage}
                
                console.log("Oops")
                console.log(curr_usage_of_all)
                Limit = false
                
                
            }
            const temp = {power: addUsage , limit: Limit}
            console.log(temp)
            Hourly.findByIdAndUpdate(mongoID, {$set:{usage:temp}}).then(result => {
                console.log('result', result)
            })
            if (flag === false) {
                var temp_curr = { id: req.body.id, usage: { power: addUsage, limit: Limit } }
                const alterResponse = Alternate(userdata, curr_usage_of_all, temp_curr)
                if (alterResponse === null) {
                    console.log("Still can cover")
                    const hourReport = new HourReport({hour:countHour , message:"good going please maintain use",suggestedBrands:Recommend_by_item(userdata)});
                    await hourReport.save();
                    res.status(201).json({ "message": `good going please maintain use `, "recommendedItem": Recommend_by_item(userdata) });
                    
                }
                else {
                    if (alterResponse !== 0) {
                        console.log(alterResponse.suggestion[0].name)
                        if (alterResponse.suggestion.length === 0) {
                             const hourReport = new HourReport({hour:countHour , message:"used too much try next day and save as much as possible",suggestedBrands:Recommend_by_item(userdata)});
                             await hourReport.save();
                            res.status(201).json({ "message": `used too much try next day and save as much as possible `, "recommendedItem": Recommend_by_item(userdata) });
                        }
                        else {
                             const hourReport = new HourReport({hour:countHour , message:`your ${alterResponse.name} took too much energy try to use given item less`,suggestedBrands:Recommend_by_item(userdata) , suggestedhour:alterResponse.suggestion});
                             await hourReport.save();
                            res.status(201).json({ "message": `your ${alterResponse.name} took too much energy try to use given item less `, "suggestion_for_items_to_be_use_less": alterResponse.suggestion, "recommendedItem": Recommend_by_item(userdata) });
                        }
                    }

                    const link = `https://localhost:3030/user/report/${countHour}`
                    Hourreport(`Action needed!!! Here is your hourly report link: ${link} See to save your bill`)
                }
            }
            else {
                const hourReport = new HourReport({hour:countHour , message:"cool",suggestedBrands:Recommend_by_item(userdata)});
                await hourReport.save();
                res.status(201).json({ "message": `cool`, "recommendedItem": Recommend_by_item(userdata) });
            }
            
        }
        else {
            const report = new Hourly(req.body);
            await report.save()
            const hourReport = new HourReport({hour:countHour , message:"Good going",suggestedBrands:Recommend_by_item(userdata)});
            await hourReport.save();
            res.status(201).json({"message":"Good going" , "recommendedItem": Recommend_by_item(userdata)});
        }
        
        
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


const getDailyReport = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.user_id });
        const appliances = user.appliances
        var report = [];
        let total_usage = 0;
        if (appliances !== null) {
            for (let i = 0; i < appliances.length; i++) {
                let tempid = appliances[i].id
                let hourly = await Hourly.findOne({ id: tempid })
                if (hourly !== null) {
                    let usage = hourly.usage.power
                    let fault = hourly.usage.limit
                    let usagetime = usage / appliances[i].power
                    let units = usage / 1000
                    total_usage += usage
                    report.push({
                        appliance_name: appliances[i].name, appliance_brand: appliances[i].brand,
                        appliance_id: appliances[i].id, total_usage: usage, fault: fault, usage_time: usagetime, units_comsumed: units
                    })
                }
            }
        }
        console.log(countHour / user.total)
        countHour = 0
        const daily_report = { user_name: user.user, user_id: user.userId, total_usage: total_usage, total_units: total_usage / 1000, appliances_report: report }
       
        res.status(200).json(daily_report)
    }
   catch (error) {
        res.status(409).json({ error: error.message })
    }
}



module.exports = {readAppliance , writeAppliance , readUser , createUser , sendHourlyReport , postShowAppliance , getHourReport , getDailyReport}