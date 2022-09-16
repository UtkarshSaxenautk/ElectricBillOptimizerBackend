//const twilio = require('twilio');

const accountSid = 'ACc283cd867f2b156d9100906d868d0bd4'; // Your Account SID from www.twilio.com/console
const authToken = '55098536abd03cf0969bf77d1f4bffae'; // Your Auth Token from www.twilio.com/console
const parsePhoneNumber = require('libphonenumber-js');




const Call = () => {
  const client = require("twilio")(accountSid, authToken);
   client.messages.create({
     body: 'This is your dad',
     from: '+18156571779',
     to: '+919419948352'
   })
    .then((data) => {
        console.log(data);
    })
}


module.exports = Call



