import express from 'express';
import './db/mongoose.js';
import userRouter from './routers/user.js';
import taskRouter from './routers/task.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is up on port:${port}`));

import Task from './models/task.js';
import User from './models/user.js';

const main = async () => {
	// const task = await Task.findById('612bc249fb6dd5d67eb600ff');
	// await task.populate('owner').execPopulate();
	// console.log(task.owner);

	// const user = await User.findById('612bc1969f1ac1cfd2696108');
	// await user.populate('tasks').execPopulate();
	// console.log(user.tasks);
};

main();
