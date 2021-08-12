import express from 'express';
import './db/mongoose.js';
import model from './models/index.js';

const { User, Task } = model;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Add a new user
app.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		// https://httpstatuses.com/
		res.status(400).send({ error });
	}
});

// Fetch all users
app.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).send(users);
	} catch (error) {
		res.status(400).send();
	}
});

// Fetch a specific user by id
app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.status(202).send(user);
	} catch (error) {
		res.status(400).send({ error: 'Error fetching user' });
	}
});

// Update a user
app.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every(prop => allowedUpdates.includes(prop))
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' })
	}
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.status(200).send(user)
	} catch (error) {
		res.status(400).send({ error });
	}
})

// Add a new task
app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(418).send({ error });
	}
});

// Fetch all tasks
app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).send(tasks);
	} catch (error) {
		res.status(400).send();
	}
});

// Fetch a specific task by id
app.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findById(_id);
		if (!task) {
			return res.status(404).send({ error: 'Task not found' });
		}
		res.status(202).send(task);
	} catch (error) {
		res.status(400).send({ error: 'Error fetching task' });
	}
});

app.listen(port, () => console.log(`Server is up on port:${port}`));
