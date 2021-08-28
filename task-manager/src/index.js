import express from 'express';
import './db/mongoose.js';
import userRouter from './routers/user.js';
import taskRouter from './routers/task.js';

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
	if (req.method === 'GET') {
		res.status(403).send('GET requests are disabled');
	} else {
		next();
	}
});
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is up on port:${port}`));

import jwt from 'jsonwebtoken';

const myFn = async () => {
	const token = jwt.sign({ _id: 'abc123' }, 'thisismyrandomprivatekey', {
		expiresIn: '7 days',
	});
	console.log('token:', token);

	const data = jwt.verify(token, 'thisismyrandomprivatekey');
	console.log(data);
};

myFn();
