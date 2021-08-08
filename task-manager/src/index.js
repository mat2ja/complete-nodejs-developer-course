import express from 'express';
import './db/mongoose.js';
import User from './models/user.js';
import Task from './models/task.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.send(user);
		console.log(user);
	} catch (error) {
		// https://httpstatuses.com/
		res.status(400).send(error);
	}
});

app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.send(task);
		console.log(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.listen(port, () => console.log(`Server is up on port:${port}`));
