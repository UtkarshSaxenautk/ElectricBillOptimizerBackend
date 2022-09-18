const express = require('express');
const dotenv  = require('dotenv');
const mongoose  = require('mongoose');
const cors = require('cors');

const routes = require('./routes/index.js');
const { DailyReport } = require('./sdk/twilio.js');
const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    Call();
    res.send("welcome");
})


           

app.use('/user' , routes)
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() =>
        app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))
    )
    .catch(err => console.log(err))


 setInterval(() => {
    const API = `http://localhost:3030/user/dailyreport/1`
     console.log("sent report")
     DailyReport(`Hey,User your daily report is now available click here ${API}`)
    countHour = 0 
 } , 1000*60*60*24)    
