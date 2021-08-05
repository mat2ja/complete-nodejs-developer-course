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

		const updatePromise = users.updateMany(
			{
				age: {
					$lte: 20,
				},
			},
			{
				$inc: {
					age: 1,
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
