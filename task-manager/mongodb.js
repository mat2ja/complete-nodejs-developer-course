// CRUD create read update delete
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'task-manager';

// creating an instance
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const mongoConnect = async () => {
	await client.connect();

	const db = client.db(dbName);

	try {
		const users = db.collection('users');
		const tasks = db.collection('tasks');

		const updatePromise = users.updateOne(
			{
				_id: new ObjectId('6105933695834089d58ecbd7'),
			},
			{
				$set: {
					name: 'juraj',
				},
				$unset: {
					age: '',
				},
				$currentDate: {
					date: true,
				},
			}
		);

		const res = await updatePromise;
		console.log(res);
	} catch (error) {
		console.log(error.message);
	}
};

mongoConnect()
	.catch(console.error)
	.finally(() => client.close());
