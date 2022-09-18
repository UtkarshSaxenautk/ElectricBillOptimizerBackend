const { SuccessMessage , Alert } = require("../sdk/twilio");

const Unit_price = 5.00;

// def checkPossibility(data,expected_bill):
//     daily_power=0
//     total_time=0
//     for i in data["appliances"][0]:
//         daily_power+=data["appliances"][0][i]["power"]
//         total_time+=data["appliances"][0][i]["expected_hours"]
//     print(daily_power,total_time)
//     power_in_month=daily_power*30*total_time
//     units=power_in_month/1000
//     bill=units*1.29
//     print(bill)
//     if (bill>expected_bill):
//         # difference=bill-expected_bill
//         print(f"its is not possible you to exepect {expected_bill} amouth by data you have given you have to reduce power of appliances or time_consumption")
//     else:
//         print("its possible to expect this bill ")

//     daily_bill_check=bill/30
//     return ([daily_bill_check,daily_power])



const sample_data = {
    "userId": "1",
    "user": "utk",
    "total": 5,
    "appliances": [
        {
            "id": 1,
            "name": "bulb",
            "brand": "syska",
            "power": 10,
            "expectedhour": 2,
        },
        {
            "id": 2,
            "name": "bulb",
            "brand": "havells",
            "power": 5,
            "expectedhour": 1,
        },
        {
             "id": 3,
            "name": "fan",
            "brand": "havells",
            "power": 100,
            "expectedhour": 5,
        },
        {
             "id": 4,
            "name": "fan",
            "brand": "syska",
            "power": 100,
            "expectedhour": 3,
        },
        {
             "id": 5,
            "name": "cooler",
            "brand": "syska",
            "power": 500,
            "expectedhour": 4,
        }
    ],
    "bill" : 90
}
function breakIntodays(exp_bill) {
    var expected_power_usage_according_to_exp_bill = exp_bill / Unit_price;
    var expected_power_usage_according_to_exp_bill_per_day = expected_power_usage_according_to_exp_bill / 30;
    return expected_power_usage_according_to_exp_bill_per_day;
}


const Recommend_by_item = (userdata) => {
    const recommendedItem = [];
    const included = [];
    for (let i = 0; i < userdata.appliances.length; i++) {
        if (userdata.appliances[i].name === "bulb" && included.includes(userdata.appliances[i].name) == false ) {
            recommendedItem.push({ "name": userdata.appliances[i].name, "brand": "Havells", "power": 5 })
            included.push(userdata.appliances[i].name)
        }
        if (userdata.appliances[i].name === "fan" &&included.includes(userdata.appliances[i].name) == false  ) {
            recommendedItem.push({ "name": userdata.appliances[i].name, "brand": "Orpat", "power": 40 })
            included.push(userdata.appliances[i].name)
        }
        if (userdata.appliances[i].name === "ac" &&included.includes(userdata.appliances[i].name) == false  ) {
            recommendedItem.push({ "name": userdata.appliances[i].name, "brand": "Voltas", "power": 2500 })
            included.push(userdata.appliances[i].name)
        }
        if (userdata.appliances[i].name === "tube" &&included.includes(userdata.appliances[i].name) == false  ) {
            recommendedItem.push({ "name": userdata.appliances[i].name, "brand": "Havells", "power": 25 })
            included.push(userdata.appliances[i].name)
        }
        
    }
    return recommendedItem
}



 
const CheckFeasibility = (userdata) => {
    daily_power = 0 
    total_time = 0
    for (var i = 0; i < userdata.appliances.length; i++) {
        daily_power += userdata.appliances[i].power * userdata.appliances[i].expectedhour;
        //total_time += userdata.appliances[i].expectedhour
      
    }
    console.log(daily_power);
    const power_in_month = daily_power * 30 
    const units=power_in_month/1000
    const practical_bill = units * Unit_price
    console.log(practical_bill)
    if (practical_bill - userdata.bill <= 50) {
       SuccessMessage("Congratulations! You have successfully subscribed to bill optimization!")
        return {"userbill" : userdata.bill , "our bill": practical_bill , "msg" : "your bill will be optimized"}
    } 
    const extra_per_day_power = (((practical_bill - userdata.bill) / Unit_price) * 1000) / 30;
    console.log(extra_per_day_power)
    const per_appliance_chnaged_needed = extra_per_day_power / userdata.total 
    const hours_appliance_should_decrease = [];
    for (var i = 0; i < userdata.appliances.length; i++) {
        var extra_hours = per_appliance_chnaged_needed / userdata.appliances[i].power;
        hours_appliance_should_decrease.push({name : userdata.appliances[i].name , extraminutes : Math.round(extra_hours*60) , brand: userdata.appliances[i].brand })
    }
    const branddata = Recommend_by_item(userdata)
    return { hours_appliance_should_decrease, "msg": "failed" , branddata };
}

const CheckLimit = ( userData , hourdata , curr) => {
    var total_power_of_appliance_per_day = 0;
    var limit_power = 0;
    var name;
    for (let i = 0; i < userData.appliances.length; i++){
        if (userData.appliances[i].id === hourdata.id) {
            limit_power += userData.appliances[i].power;
            name = userData.appliances[i].name;
            total_power_of_appliance_per_day += (userData.appliances[i].power * userData.appliances[i].expectedhour);
        }
    }
    if (curr > limit_power || total_power_of_appliance_per_day < hourdata.usage.power) {
        Alert("Please check your " + name + " it is taking more than expected")
        return { value: false, appliance: name } ;
    }
    return { value: true, appliance: name } ;
}

const CheckUsage = (appliancedata, curr_usage_of_all) => {
    for (let i = 0; i < curr_usage_of_all.length; i++) {
        if (curr_usage_of_all[i].id === appliancedata.id) {
            const power = appliancedata.power *appliancedata.expectedhour;
            if (curr_usage_of_all[i].usage.power > power) {
            return false;
            }
        }
    }
    
    return true;
}

const Alternate = (userData ,curr_usage_of_all , curr_app) => {
    var curr_name;
    var curr_power;
    console.log(curr_app , " ..." , curr_usage_of_all);
    for (let i = 0; i < userData.appliances.length; i++) {
        if (userData.appliances[i].id === curr_app.id) {
            curr_name = userData.appliances[i].name;
            curr_power = userData.appliances[i].power * userData.appliances[i].expectedhour;
            break;
        }
    }
    var length = 0;
    var feasibleAppliances = [];
   
    for (let i = 0; i < userData.appliances.length; i++){
        if (userData.appliances[i].id !== curr_app.id) {
            if (CheckUsage(userData.appliances[i], curr_usage_of_all)) {
                length++;
                feasibleAppliances.push({ name: userData.appliances[i].name, power: userData.appliances[i].power , id : userData.appliances[i].id });
            }
        }
    }
    var diff =  curr_app.usage.power - curr_power;
    console.log("length: " + length)
    console.log(diff)
    const temp_diff = diff / length
    console.log(temp_diff);
    
    if (diff > 0) {
        var suggest = [];
        for (let i = 0; i < feasibleAppliances.length; i++){
            const time_reduction = Math.round(temp_diff / feasibleAppliances[i].power)
             suggest.push({name: feasibleAppliances[i].name, time: `${time_reduction}hours` , id : feasibleAppliances[i].id})
        }
        return {diff : diff , name : curr_name, suggestion : suggest };
    }
    return null;
    
}


//console.log(CheckFeasibility(sample_data));
module.exports = { CheckFeasibility, CheckLimit , Recommend_by_item , Alternate }

