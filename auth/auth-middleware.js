const bcrypt = require('bcrypt')

const usersDb = require('./auth-model')

module.exports = {
    valReqBody,
    valUniqUser,
    hashPass
}

function valReqBody(req, res, next) {
    if (!req.body) return res.status(400).json({message: 'Missing content application/json'})

    for (let prop of ['username', 'password']) {
        if (!req.body[prop]) return res.status(400).json({message: 'Missing required property: ' + prop})

        if (typeof req.body[prop] != 'string') return res.status(400).json({message: `Property ${prop} must be a string`})
    }

    next()
}

function valUniqUser(req, res, next) {
    const username = req.body.username
    
    usersDb.findId({username})
        .then(resp => {
            if (!resp) next()
            else res.status(409).json({message: `Username ${username} is already in use. Please use something else.`})
        })
        .catch(err => {
            console.error(err)
            res.sendStatus(500)
        })
}

async function hashPass(req, res, next) {
    try {
        
        if (typeof req === 'string') return await bcrypt.hash(req, 16)

        res.locals.hash = await bcrypt.hash(req.body.password,16)
        next()

    } catch (err) {
        next(err)
    }

}