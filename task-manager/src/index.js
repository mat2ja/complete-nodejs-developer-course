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
		res.send(users);
	} catch (error) {
		res.status(400).send();
	}
});

// Fetch a specific user by id
app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findById(_id);
		user
			? res.status(202).send(user)
			: res.status(404).send({ error: 'User not found' });
	} catch (error) {
		res.status(400).send({ error: 'Error fetching user' });
	}
});

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

app.listen(port, () => console.log(`Server is up on port:${port}`));
