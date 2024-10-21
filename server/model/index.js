import 'dotenv/config.js';
import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;

const url = `${MONGODB_URL}/${MONGODB_DB}`;
mongoose.connect(url)
.then(()=>{console.log(`${MONGODB_DB} DB connection established`)})
.catch((err)=>{console.log(err)})  

export default mongoose;