// CRUD create read update delete
const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017' // kao ima issue sa localhost, uspor, bumo vidli
const dbName = 'task-manager'

//  useUnifiedTopology: true umjesto parsera
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log('Connected successfully🥳');

})