import mongoose from 'mongoose';
import validator from 'validator';

const { isEmail } = validator;

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
	// const userSchema = new mongoose.Schema({
	// 	name: {
	// 		type: String,
	// 		required: [true, 'Name not provided'],
	// 		minLength: [2, 'Name too short'],
	// 		trim: true,
	// 		lowercase: true,
	// 	},
	// 	email: {
	// 		type: String,
	// 		required: [true, 'Email not provided'],
	// 		trum: true,
	// 		lowercase: true,
	// 		validate(value) {
	// 			if (!isEmail(value)) {
	// 				throw new Error('Email not valid');
	// 			}
	// 		},
	// 	},
	// 	password: {
	// 		type: String,
	// 		required: true,
	// 		trim: true,
	// 		minLength: 6,
	// 		validate(value) {
	// 			if (value.toLowerCase().includes('password')) {
	// 				throw new Error(`Password can't contain word 'password'`);
	// 			}
	// 		},
	// 	},
	// 	age: {
	// 		type: Number,
	// 		validate(value) {
	// 			if (value < 0) {
	// 				throw new Error('Age must be positive number');
	// 			}
	// 			if (!Number.isInteger(value)) {
	// 				throw new Error('Age must be a whole number');
	// 			}
	// 		},
	// 		max: [120, 'Too old'],
	// 		default: 0,
	// 	},
	// 	nickname: {
	// 		type: String,
	// 		default: 'genericky',
	// 	},
	// });

	// const User = new mongoose.model('User', userSchema);

	// const user = new User({
	// 	name: 'petar',
	// 	email: 'petar.sapunar@infokarta.hr',
	// 	password: '        vue je zakon  ',
	// 	age: 30,
	// 	nickname: 'sapun',
	// });

	// try {
	// 	const res = await user.save();
	// 	console.log(res);
	// } catch (error) {
	// 	console.log(error.message);
	// }

	const taskSchema = new mongoose.Schema({
		description: {
			type: String,
			required: true,
			trim: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	});

	const Task = new mongoose.model('Task', taskSchema);

	const task = new Task({
		description: 'watch lex podcast',
	});

	try {
		const res = await task.save();
		console.log(res);
	} catch (error) {
		console.log(error.message);
	}

	mongoose.disconnect();
});
