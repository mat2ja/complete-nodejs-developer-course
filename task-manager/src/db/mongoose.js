import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017';
const dbName = 'task-manager-api';

mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// const db = mongoose.connection

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'matija',
    age: 21
})

me.save()
    .then((u) => console.log(u))
    .catch(err => console.log(err.message))