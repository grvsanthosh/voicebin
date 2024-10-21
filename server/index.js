import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import router from './router/index.js';

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());     

app.use('/', router);

app.listen(PORT,()=>{console.log(`listening on port ${PORT}`)})