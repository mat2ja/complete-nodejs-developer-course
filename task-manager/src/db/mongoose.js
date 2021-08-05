import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017';
const dbName = 'task-manager-api';

mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('error', () => console.error('connection error'))
db.once('open', () => {
    console.log('connected successfully')

    const User = mongoose.model('User', {
        name: {
            type: String
        },
        age: {
            type: Number
        }
    })

    const me = new User({
        name: 'marin',
        age: 20
    })

    me.save()
        .then((u) => console.log(u))
        .catch(err => console.log(err))
})

