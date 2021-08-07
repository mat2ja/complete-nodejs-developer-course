import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
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

export default Task;
