// CRUD create read update delete
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017'
const dbName = 'task-manager'

// creating an instance
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const mongoConnect = async () => {
    await client.connect()

    const db = client.db(dbName)

    try {
        const users = db.collection('users')
        const tasks = db.collection('tasks')

        // const found = await users
        //     .find({ name: /^ma*/i })
        //     .sort({ age: -1 })
        //     .limit(2)
        //     .toArray()

        // console.log(found);

        const latest = await tasks.findOne({}, { sort: { $natural: -1 } })
        console.log(latest);

        // toArray needs await
        const unfinished = await tasks.find({ 'completed': false }).toArray()
        console.log('unfinished:', unfinished);


    } catch (error) {
        console.log(error.message);
    }
}

mongoConnect()
    .catch(console.error)
    .finally(() => client.close())