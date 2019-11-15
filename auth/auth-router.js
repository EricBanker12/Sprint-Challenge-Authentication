const router = require('express').Router();

const usersDb = require('./auth-model')
const {valReqBody, valUniqUser, hashPass} = require('./auth-middleware')

router.post('/register', valReqBody, valUniqUser, (req, res) => {
  // implement registration

});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
