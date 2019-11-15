const request = require('supertest')
const bcrypt = require('bcrypt')

const server = require('./server')
const db = require('../database/dbConfig')

describe('/api/auth', () => {
    
    describe('/register', () => {

        beforeEach(() => db('users').truncate())

        const username = 'testing'
        const password = 'password'

        bcrypt.hash = jest.fn(password=>password)

        test('should return status 201 Created', () => {
            return request(server).post('/api/auth/register').send({username, password})
                .expect(201)
        })

        test('should return json', () => {
            return request(server).post('/api/auth/register').send({username, password})
                .then(resp => {
                    expect(resp.type).toMatch(/json/i)
                })
        })

        test('should return body with authorization', () => {
            return request(server).post('/api/auth/register').send({username, password})
                .then(resp => {
                    expect(resp.body).toBeDefined()
                    expect(resp.body.authorization).toBeDefined()
                })
        })

        test('should return status 409 Conflict for a repeat username', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/register').send({username, password})
                .expect(409)
        })
    })

    describe('/login', () => {

        beforeEach(() => db('users').truncate())

        const username = 'testing'
        const password = 'password'

        bcrypt.compare = jest.fn((a,b,cb) => {cb(false, a === b)})

        test('should return status 200 Ok', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/login').send({username, password})
                .expect(200)
        })

        test('should return json', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/login').send({username, password})
                .then(resp => {
                    expect(resp.type).toMatch(/json/i)
                })
        })

        test('should return body with authorization', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/login').send({username, password})
                .then(resp => {
                    expect(resp.body).toBeDefined()
                    expect(resp.body.authorization).toBeDefined()
                })
        })

        test('should return status 401 Unauthorized for wrong username', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/login').send({username: 'wrong', password})
                .expect(401)
        })

        test('should return status 401 Unauthorized for wrong password', async () => {
            await db('users').insert({username, password})
            return request(server).post('/api/auth/login').send({username, password: 'wrong'})
                .expect(401)
        })
    })
})