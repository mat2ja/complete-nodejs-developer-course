import express from 'express';
import Task from '../models/task.js';

const router = new express.Router();

// Add a new task
router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(418).send({ error });
	}
});

// Fetch all tasks
router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).send(tasks);
	} catch (error) {
		res.status(400).send();
	}
});

// Fetch a task by id
router.get('/tasks/:id', async (req, res) => {
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

// Update a task
router.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((prop) =>
		allowedUpdates.includes(prop)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!task) {
			res.status(404).send({ error: 'Task not found' });
		}
		return res.status(200).send(task);
	} catch (error) {
		res.status(400).send({ error });
	}
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send({ error: 'Task not found' });
		}
		return res.status(200).send(task);
	} catch (error) {
		res.status(500).send({ error });
	}
});

export default router;
