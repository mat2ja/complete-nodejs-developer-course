import express from 'express'
import User from '../models/user.js';

const router = new express.Router()


// Add a new user
router.post('/users', async (req, res) => {
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
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send();
    }
});


// Fetch a user by id
router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(prop => allowedUpdates.includes(prop)) && updates.length

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


// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        console.log(user);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        return res.status(200).send(user)
    } catch (error) {
        res.status(500).send({ error });
    }
})


export default router