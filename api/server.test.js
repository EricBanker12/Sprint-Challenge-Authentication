const request = require('supertest')

const server = require('./server')
const db = require('../database/dbConfig')

describe('/api/auth', () => {
    
    describe('/register', () => {

        beforeEach(() => db('users').truncate())

        test('should return status 201 Created', () => {
            return request(server).post('/api/auth/register').send({username: 'testing', password: 'password'})
                .expect(201)
        })

        test('should return json', () => {
            return request(server).post('/api/auth/register').send({username: 'testing', password: 'password'})
                .then(resp => {
                    expect(resp.type).toMatch(/json/i)
                })
        })

        test('should return body with authorization', () => {
            return request(server).post('/api/auth/register').send({username: 'testing', password: 'password'})
                .then(resp => {
                    expect(resp.body).toBeDefined()
                    expect(resp.body.authorization).toBeDefined()
                })
        })
    })
})