require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndDelete('65e88cd4235a8d7351c85b5d').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ 'completed': false });
// }).then((result) => {
//     console.log(result)

// }).catch((e) => {
//     console.log('error', e)

// })
//65e1f89e0056a72c393a7760

const deleteTaskAndCount = async (id) => {

    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ 'completed': false });

    //throw new Error('ops')
    return count
}

deleteTaskAndCount('65e88cc5235a8d7351c85b58', 16).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('error', e)
})