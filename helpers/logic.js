const Unit_price = 4.00;

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
    const practical_bill = units * 1.29
    console.log(practical_bill)
    if (practical_bill - userdata.bill <= 13) {
        return "horray your bill will be optimized";
    } 
    const extra_per_day_power = (((practical_bill - userdata.bill) / 1.29) * 1000) / 30;
    console.log(extra_per_day_power)
    const per_appliance_chnaged_needed = extra_per_day_power / userdata.total 
    const hours_appliance_should_decrease = [];
    for (var i = 0; i < userdata.appliances.length; i++) {
        var extra_hours = per_appliance_chnaged_needed / userdata.appliances[i].power;
        hours_appliance_should_decrease.push({name : userdata.appliances[i].name , extraminutes : Math.round(extra_hours*60) , brand: userdata.appliances[i].brand})
    }
    
    return hours_appliance_should_decrease;
}

console.log(CheckFeasibility(sample_data));


module.exports = CheckFeasibility

