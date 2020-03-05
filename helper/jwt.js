const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || "secret"

class HelperJwt {
  static signToken(payload) {
    return jwt.sign({'token' : payload}, secret)
  }
  static vertifyToken(payload) {
    return jwt.verify(payload,secret)
  }
}

module.exports = HelperJwt