import '../src/db/mongoose.js'
import model from '../src/models/index.js'
const { User } = model

User.findByIdAndUpdate('610ea3838156b805088ae1c9', { age: 1 })
    .then(user => {
        console.log(user)
        return User.countDocuments({ age: 1 })
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error.message))