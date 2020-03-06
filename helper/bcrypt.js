const bcrypt = require('bcryptjs')
const salt = +process.env.SALT

class HelperBcrypt {
  static hashPassword (password) {
    return bcrypt.hashSync(password, salt)
  }
  static comparePassword (password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
  }
}

module.exports = HelperBcrypt