import mongoose from 'mongoose';
import validator from 'validator';
import bcript from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;
const { isEmail } = validator;

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name not provided'],
		minLength: [2, 'Name too short'],
		maxLength: [24, 'Name too long'],
		trim: true,
		lowercase: true,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Email not provided'],
		trim: true,
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
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user.id }, 'podmojesobe');

	user.tokens.push({ token });
	user.save();

	return token;
};

// not stored in db, they are like computed properties
userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
});


userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login');
	}

	const isMatch = await bcript.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Unable to login');
	}

	return user;
};

// Hash the plain text password
userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcript.hash(user.password, 8);
	}
	next();
});

const User = new mongoose.model('User', userSchema);

export default User;
