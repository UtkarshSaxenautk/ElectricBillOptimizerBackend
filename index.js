import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js'
const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("welcome");
})
app.use('/user' , routes)
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`)))
    .catch(err => console.log(err))
