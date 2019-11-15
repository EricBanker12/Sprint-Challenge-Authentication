const router = require('express').Router();
const jwt = require('jsonwebtoken')

const usersDb = require('./auth-model')
const {valReqBody, valUniqUser, hashPass} = require('./auth-middleware')

router.post('/register', valReqBody, valUniqUser, (req, res) => {
  // implement registration
  const username = req.body.username
  const password = hashPass(req.body.password)

  usersDb.add({username, password})
    .then(resp => {
      if (resp) {
        const {id, username} = resp
        const secret = process.env.SECRET || 'secret key'
        const authorization = jwt.sign({id}, secret, {expiresIn: '18h'})
        res.status(201).json({message: `Hello ${username}.`, id, authorization})
      }
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
