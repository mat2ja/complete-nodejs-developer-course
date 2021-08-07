import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;
const { isEmail } = validator;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name not provided'],
		minLength: [2, 'Name too short'],
		trim: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: [true, 'Email not provided'],
		trum: true,
		lowercase: true,
		validate(value) {
			if (!isEmail(value)) {
				throw new Error('Email not valid');
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: [6, 'Password must be at least 6 characters'],
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error(`Password can't contain word 'password'`);
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be positive number');
			}
			if (!Number.isInteger(value)) {
				throw new Error('Age must be a whole number');
			}
		},
		max: [120, 'Too old'],
	},
});

const User = new mongoose.model('User', userSchema);

export default User;
