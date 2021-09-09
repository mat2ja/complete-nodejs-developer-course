import express from 'express';
import multer from 'multer';
import User from '../models/user.js';
import auth from '../middleware/auth.js';

const router = new express.Router();

// Add a new user
router.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const { email, password } = req.body;
		const token = await user.generateAuthToken(email, password);
		res.status(201).send({ user, token });
	} catch (error) {
		res.status(400).send({ error });
	}
});

// Login user
router.post('/users/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

// Logout user
router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(
			(token) => token.token != req.token
		);
		await req.user.save();
		res.send('Logged out');
	} catch (error) {
		res.status(500).send();
	}
});

// Logout all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send('Logged out');
	} catch (error) {
		res.status(500).send();
	}
});

// Fetch profile
router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

// Update a user
router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((prop) =>
		allowedUpdates.includes(prop)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();
		res.send(req.user);
	} catch (error) {
		res.status(400).send({ error });
	}
});

// Delete a user
router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		return res.send('User deleted');
	} catch (error) {
		res.status(500).send({ error });
	}
});

const upload = multer({
	dest: 'avatars',
	limits: {
		// size in bytes → 1MB
		fileSize: 1 * 1024 * 1024,
	},
	fileFilter(req, file, cb) {
		const fileTypeRegex = /image\/jpg|jpeg|png$/;
		if (!file.mimetype.match(fileTypeRegex)) {
			cb(new Error('You must upload an image you dimbuss!!!'));
		}
		cb(null, true);
	},
});

const errorMiddleware = (req, res, next) => {
	throw new Error('from my middleware');
};

// Upload user avatar
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
	res.send('Avatar uploaded');
});

router.use((error, req, res, next) => {
	res.status(400).send({ error: error.message });
});

export default router;
