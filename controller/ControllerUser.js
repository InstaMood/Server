const { User } = require('../models')
const { hashPassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library');
const client_id = process.env.CLIENT_ID
const client = new OAuth2Client(client_id);

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if(data){
          const validate = hashPassword(password,data.password)
          if(validate) {
            const payload = {
              email,
              id: data.id
            }
            const token = signToken(payload)
            res.status(200).json(token)
          }
        }else{
          return User.create({
            email,
            password
          })
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static login (req, res, next) {
    const { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if(data == null){
          next({
            name: "costume",
            status: 404,
            message: "Wrong email / password"
          })
        }else{
          const validate = hashPassword(password,data.password)
            if(validate) {
              const payload = {
                email,
                id: data.id
              }
              const token = signToken(payload)
              res.status(200).json(token)
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static loginGoogle (req, res, next) {
    let data = ''
    client.verifyIdToken(
      {
        idToken: req.headers.token,
        audience: client_id
      }
    )
      .then(result => {
        data = result.payload
        return User.findOne({
          where: {
            email: data.email
          }
        })
      })
      .then(data => {
        if(data) {
          return data
        }else{
          return User.create({
            where: {
              email: data.email,
              password: process.env.PASSWORD_GOOGLE
            }
          })
        }
      })
      .then(data => {
        let payload = 
        {
          id: data.id,
          email: data.email,
        }
        let token = signToken(payload)
        res.status(200).json(token)
      })
      .catch(err => {
        next(err)
      })
  }
}
module.exports = UserController