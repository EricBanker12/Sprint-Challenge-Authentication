/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  
  if (!req.headers || !req.headers.authorization) {
    return res.status(400).json({message: 'Missing authorization header'})
  }

  const authorization = req.headers.authorization

  jwt.verify(authorization, secret, (err, decoded) => {
    if (err) {
      // console.log(err)
      res.status(401).json({ you: 'shall not pass!' });
    }
    else {
      res.locals.user = {id: decoded.id}
      next()
    }
  })
};
