const  { Photo } = require('../models')

class ControllerPhoto {
  static findAll(req, res, next) {
    Photo.findAll() 
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static findAllUser(req, res, next) {
    Photo.findAll({
      where: {
        UserId: req.userId
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static delete(req, res, next) {
    const  { id } = req.params
    Photo.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json({
          message: "Delete succses"
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static update(req, res, next) {
    const { id } = req.params
    const { description } = req.body
    Photo.update({
      description
    },
    {
      where: {
        id
      },
      returning:true
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static create(req, res, next) {
    const { link, description } =req.body
    Photo.create({
      link,
      description,
      UserId: req.userId
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static findOne(req, res, next) {
    const  { id } =  req.params
    Photo.findOne({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}


module.exports = ControllerPhoto