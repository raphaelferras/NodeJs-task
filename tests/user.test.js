const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const request = require('supertest');

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET)
    }]
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

    const response = await request(app)
        .post('/users')
        .send(data)
        .expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Raphael',
            email: 'raphaelferras@gmaaaail.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('MyPass111222')
})

test('Should login existing user', async () => {
    const data = {
        email: 'mike@example.com',
        password: '56what!!'
    }
    const response = await request(app)
        .post('/users/login')
        .send(data)
        .expect(200)
    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
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

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const user = await User.findById(userOneID)
    expect(user).not.toBeNull()
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user2 = await User.findById(userOneID)
    expect(user2).toBeNull()

})

test('Should not delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    const beforeUser = await User.findById(userOneID)
    expect(beforeUser.avatar).toEqual(undefined)
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', './tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update account field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ name: 'test' })
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user.name).toBe('test')
})

test('Should not update account field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ location: 'test' })
        .expect(400)
})
