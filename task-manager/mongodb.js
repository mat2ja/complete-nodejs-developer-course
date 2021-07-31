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

    //* callbacks (doesnt even handle error)
    db.collection('users').insertOne({
        name: 'matija',
        age: 21
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user 🥑');
        }
        console.log(result.insertedId);
    })

    //* promises
    db.collection('users').insertOne({
        name: 'matija',
        age: 21
    }).then(result => console.log(result.insertedId))
        .catch(err => console.log('Unable to insert user 🥶'))

    //* async/await
    const result = await db.collection('users').insertOne({
        name: 'matija',
        age: 21
    })
        .catch(error => console.log('Unable to insert user 🥵'))
    if (result) {
        console.log(result.insertedId);
    }

    //* async/await trycatch
    try {
        const result = await db.collection('users').insertOne({
            name: 'matija',
            age: 21
        })
        console.log(result.insertedId);
    } catch (error) {
        console.log('Unable to insert user 🦎')
    }
})