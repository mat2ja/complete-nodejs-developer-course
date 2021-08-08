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
db.once('open', async () => console.log('🐦 mongoose up and running 🐤'));
