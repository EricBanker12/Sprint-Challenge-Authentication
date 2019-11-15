const db = require('../database/dbConfig')

module.exports = {
    add,
    find,
    findId,
}

function add(user) {
    return db('users').insert(user, 'id')
        .then(([id]) => find({id}))
}

function find(filter) {
    if (filter) return db('users').where(filter).first()
    else return db('users')
}

function findId(filter) {
    if (filter) return db('users').select('id').where(filter).first()
    else return db('users').select('id')
}