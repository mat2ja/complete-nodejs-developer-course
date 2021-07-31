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
        const tasks = db.collection('tasks')
        const result = await tasks.insertMany([
            {
                description: 'fix bike',
                completed: false
            },
            {
                description: 'setup bitwarden',
                completed: false
            },
            {
                description: 'study mongo',
                completed: true
            },
        ])
        console.log(result.insertedIds);
    } catch (error) {
        console.log(error.message);
    }
})