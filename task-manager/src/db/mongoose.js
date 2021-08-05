import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017';
const dbName = 'task-manager-api';

mongoose.connect(`${url}/${dbName}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', () => console.error('connection error'));
db.once('open', async () => {
	console.log('connected successfully');

	const taskSchema = new mongoose.Schema({
		description: {
			type: String,
		},
		completed: {
			type: Boolean,
		},
	});

	const Task = new mongoose.model('Task', taskSchema);

	const task = new Task({
		description: 'uciti mongo',
		completed: false,
	});

	try {
		const res = await task.save();
		console.log(res);
	} catch (error) {
		console.log(error.message);
	}
});
