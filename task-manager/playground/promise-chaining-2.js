import '../src/db/mongoose.js'
import model from '../src/models/index.js'
const { Task } = model

// 610fdb14f765a316a110f04a

Task.findByIdAndRemove('610fdb14f765a316a110f04a')
    .then(task => {
        console.log('Removed: ', task);
        return Task.countDocuments({ completed: false })
    })
    .then(count => {
        console.log(`There are ${count} tasks yet to be completed`);
    })
    .catch(error => console.log(error.message))
