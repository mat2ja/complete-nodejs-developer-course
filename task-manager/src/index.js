import express from 'express';
import './db/mongoose.js';
import User from './models/user.js';

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
		res.status(500).send({
			error: error.message,
		});
	}
});

app.listen(port, () => console.log(`Server is up on port:${port}`));
