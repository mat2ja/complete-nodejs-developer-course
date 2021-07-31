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

const mongoConnect = async () => {
    await client.connect()

    const db = client.db(dbName)

    try {
        const users = db.collection('users')

        const result = await users.insertOne(
            {
                _id: id,
                name: 'jakov',
                age: 55
            },
        )
        console.log(result.insertedId);
    } catch (error) {
        console.log(error.message);
    }
}

mongoConnect()
    .catch(console.error)
    .finally(() => client.close())