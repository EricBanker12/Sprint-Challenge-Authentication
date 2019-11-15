const router = require('express').Router();

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
        res.status(201).json({message: `Hello ${username}.`, id})
      }
    })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
