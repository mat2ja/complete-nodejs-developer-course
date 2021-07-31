// CRUD create read update delete
const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017' // kao ima issue sa localhost, uspor, bumo vidli
const dbName = 'task-manager'

//  useUnifiedTopology: true umjesto parsera
MongoClient.connect(connectionURL, { useNewUrlParser: true }, async (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(dbName)

    try {
        const result = await db.collection('users').insertMany([
            {
                name: 'matija',
                age: 21
            },
            {
                name: 'jen',
                age: 43
            }
        ])
        console.log('insertedIds:', result.insertedIds);
        console.log('insertedCount:', result.insertedCount);
    } catch (error) {
        console.log('Unable to insert user 🦎')
    }
})