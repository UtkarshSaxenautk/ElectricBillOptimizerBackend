//const twilio = require('twilio');

const accountSid = 'ACc283cd867f2b156d9100906d868d0bd4'; // Your Account SID from www.twilio.com/console
const authToken = '55098536abd03cf0969bf77d1f4bffae'; // Your Auth Token from www.twilio.com/console
const parsePhoneNumber = require('libphonenumber-js');


const client = require("twilio")(accountSid, authToken);

const Call = () => {
  
   client.messages.create({
     body: 'This is your dad',
     from: '+18156571779',
     to: '+919419948352'
   })
    .then((data) => {
        console.log(data);
    })
}

const Alert = (msg) => {
  client.messages.create({
     body: msg,
     from: '+18156571779',
     to: '+917985259022'
   })
}

const SuccessMessage = (msg) => {
  client.messages.create({
    body: msg,
    from: '+18156571779',
    to : '+917985259022'
  })
}

const Hourreport = (msg) => {
   client.messages.create({
    body: msg,
    from: '+18156571779',
    to : '+917985259022'
  })
}

const DailyReport = (msg) => {
  client.messages.create({
    body: msg,
    from: '+18156571779',
    to : '+917985259022'
  })
}



module.exports = { Call, SuccessMessage , Alert , Hourreport , DailyReport }



