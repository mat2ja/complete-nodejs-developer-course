import express from 'express';
import './db/mongoose.js';
import model from './models/index.js';
const { User, Task } = model;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		// https://httpstatuses.com/
		res.status(400).send(error);
	}
});

app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.listen(port, () => console.log(`Server is up on port:${port}`));
