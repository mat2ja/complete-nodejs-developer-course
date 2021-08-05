// CRUD create read update delete
import { MongoClient } from 'mongodb';

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

        const latest = await tasks.findOne({}, { sort: { $natural: -1 } })
        console.log(latest);

        await tasks.findOneAndUpdate({ 'description': 'fix bike' }, { $set: { 'completed': true } })
        await tasks.updateOne({ 'description': 'fix bike' }, { $set: { 'description': 'popravit bajk' } })

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