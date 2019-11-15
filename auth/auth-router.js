const router = require('express').Router();
const jwt = require('jsonwebtoken')

const usersDb = require('./auth-model')
const {valReqBody, valUniqUser, hashPass, valUser, valPass} = require('./auth-middleware')

router.post('/register', valReqBody, valUniqUser, hashPass, (req, res) => {
  // implement registration
  const username = req.body.username
  const password = res.locals.hash

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

router.post('/login', valReqBody, valUser, valPass, (req, res) => {
  // implement login
  const {id, username} = res.locals.user
  const secret = process.env.SECRET || 'secret key'
  const authorization = jwt.sign({id}, secret, {expiresIn: '18h'})
  res.status(200).json({message: `Hello ${username}.`, id, authorization})
});

module.exports = router;
