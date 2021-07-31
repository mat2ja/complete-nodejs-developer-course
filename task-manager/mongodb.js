// CRUD create read update delete
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017'
const dbName = 'task-manager'

// creating an instance
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const id = ObjectId()
console.log(id);
console.log(id.toString());
console.log(id.toHexString());
console.log(id.valueOf());
console.log(id.getTimestamp());
console.log(id.inspect())

const mongoConnect = async () => {
    await client.connect()

    const db = client.db(dbName)

    try {
        const tasks = db.collection('tasks')

        // const result = await tasks.insertMany([
        //     {
        //         description: 'fix bike',
        //         completed: false
        //     },
        //     {
        //         description: 'setup bitwarden',
        //         completed: false
        //     },
        //     {
        //         description: 'study mongo',
        //         completed: true
        //     },
        // ])
        // console.log(result.insertedIds);
    } catch (error) {
        console.log(error.message);
    }
}

mongoConnect()
    .catch(console.error)
    .finally(() => client.close())