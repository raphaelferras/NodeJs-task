require('../src/db/mongoose')
const User = require('../src/models/user')


// User.findByIdAndUpdate('65e1f89e0056a72c393a7760', { 'age': '2' }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ 'age': 2 });
// }).then((result) => {
//     console.log(result)

// }).catch((e) => {
//     console.log('error', e)

// })
//65e1f89e0056a72c393a7760

const updateAgeAndCount = async (id, age) => {

    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age });

    //throw new Error('ops')
    return count
}

updateAgeAndCount('65e5d7c666eda196724417d6', 16).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('error', e)
})