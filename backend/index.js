import express from 'express';
import connectDB from './db/index.js';
import ngoRouter from './routes/ngo.js';
import studentRouter from './routes/student.js';
import cors from 'cors';
import utilRouter from './routes/utils.js';
import expenseRouter from './routes/expense.js';
import todoRouter from './routes/todos.js';
import quizRouter from './routes/quiz.js';
import videoRouter from './routes/video.js';
const app = express();
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.use(cors()); 

connectDB();

app.use('/ngo', ngoRouter);
app.use('/student',studentRouter);
app.use('/expense',expenseRouter)
app.use('/utils',utilRouter);
app.use('/todo',todoRouter);
app.use('/quiz',quizRouter);
app.use('/expense',expenseRouter);
app.use('/videos',videoRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
