const express = require('express')
require('./db/mongoose')
const UserRouter = require('./routers/User')
const TaskRouter = require('./routers/task')
const app = express()

const port = process.env.PORT || 3000

const multer = require('multer')

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload a jpg/jpeg or png file'))
        }
        cb(undefined, true)
    }
})
//upload.single('upload'),
const errorMiddleware = (req, res, next) => {
    throw new Error('error Raph')
}
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})