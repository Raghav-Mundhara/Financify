import express from 'express';
import connectDB from './db/index.js';
import ngoRouter from './routes/ngo.js';

const app = express();
app.use(express.json());
connectDB();

app.use('/ngo', ngoRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
