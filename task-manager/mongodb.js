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

        const user = await users.findOne({ _id: ObjectId ('61057cad2b137c032723d242') })
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
}

mongoConnect()
    .catch(console.error)
    .finally(() => client.close())