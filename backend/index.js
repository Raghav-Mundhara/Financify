import express from 'express';
import connectDB from './db/index.js';
import ngoRouter from './routes/ngo.js';
import studentRouter from './routes/student.js';
import cors from 'cors';
import utilRouter from './routes/utils.js';
const app = express();
app.use(express.json());
app.use(cors()); 

connectDB();

app.use('/ngo', ngoRouter);
app.use('/student',studentRouter);
app.use('/utils',utilRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
