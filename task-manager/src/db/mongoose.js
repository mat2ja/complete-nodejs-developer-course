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
	const userSchema = new mongoose.Schema({
		name: {
			type: String,
			required: [true, 'Name not given'],
			minLength: 2,
		},
		age: {
			type: Number,
			min: [12, 'Too young'],
			max: 120,
		},
	});

	const User = new mongoose.model('User', userSchema);

	const user = new User({
		age: 11,
	});

	try {
		const res = await user.save();
		console.log(res);
	} catch (error) {
		console.log(error.message);
	}

	mongoose.disconnect();
});
