import mongoose from 'mongoose';
import validator from 'validator';

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
			required: [true, 'Name not provided'],
			minLength: [2, 'Name too short'],
		},
		email: {
			type: String,
			required: [true, 'Email not provided'],
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email not valid');
				}
			},
		},
		age: {
			type: Number,
			validate(value) {
				if (value < 0) {
					throw new Error('Age must be positive number');
				}
				if (!Number.isInteger(value)) {
					throw new Error('Age must be a whole number');
				}
			},
			min: [12, 'Too young'],
			max: [120, 'Too old'],
		},
	});

	const User = new mongoose.model('User', userSchema);

	const user = new User({
		name: 'm',
		email: 'mirnahotmail.eu',
		age: -245,
	});

	try {
		const res = await user.save();
		console.log(res);
	} catch (error) {
		console.log(error.message);
	}

	mongoose.disconnect();
});
