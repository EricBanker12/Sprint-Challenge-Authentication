const request = require('supertest')

const server = require('./server')
const db = require('../database/dbConfig')

describe('/api/auth', () => {
    
    describe('/register', () => {

        beforeEach(() => {
            db('users').truncate()
        })

        test('should return status 201 Created', () => {
            return request(server).post('/api/auth/register').send({username: 'testing', password: 'password'})
                .expect(201)
        })
    })
})