import express from 'express';
import Task from '../models/task.js';
import auth from '../middleware/auth.js';

const router = new express.Router();

// Add a new task
router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(418).send({ error });
	}
});

// Fetch all tasks
router.get('/tasks', auth, async (req, res) => {
	try {
		const tasks = await Task.find({ owner: req.user._id });
		res.send(tasks);
		// await req.user.populate('tasks').execPopulate();
		// res.send(req.user.tasks);
	} catch (error) {
		res.status(400).send();
	}
});

// Fetch a task by id
router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send({ error: 'Task not found' });
		}
		res.status(202).send(task);
	} catch (error) {
		res.status(400).send({ error: 'Error fetching task' });
	}
});

// Update a task
router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((prop) =>
		allowedUpdates.includes(prop)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const task = await Task.findOneAndUpdate(
			{ _id: req.params.id, owner: req.user._id },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!task) {
			return res.status(404).send({ error: 'Task not found' });
		}
		return res.send(task);
	} catch (error) {
		res.status(404).send({ error });
	}
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send({ error: 'Task not found' });
		}
		return res.send(task);
	} catch (error) {
		res.status(500).send({ error });
	}
});

export default router;
