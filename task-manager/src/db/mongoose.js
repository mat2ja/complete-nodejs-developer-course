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
db.once('open', async () => {
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
        name: 'laura',
        age: 19
    })

    try {
        const user = await me.save()
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
})

