const app = require('../src/app')
const User = require('../src/models/user')
const request = require('supertest');

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    const data = {
        name: 'Raphael',
        email: 'raphaelferras@gmaaaail.com',
        password: 'MyPass111222'
    }

    await request(app)
        .post('/users')
        .send(data)
        .expect(201)
})

test('Should login existing user', async () => {
    const data = {
        email: 'mike@example.com',
        password: '56what!!'
    }

    await request(app)
        .post('/users/login')
        .send(data)
        .expect(200)
})

test('Should not login non existing user', async () => {
    const data = {
        email: 'mikrrre@example.com',
        password: '56what!!'
    }

    await request(app)
        .post('/users/login')
        .send(data)
        .expect(400)
})
