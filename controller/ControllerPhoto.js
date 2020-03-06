const  { Photo } = require('../models')
const restler = require('restler');
const bufferToBase64 = require('base64-arraybuffer');
const googleVision = require('../helper/googleVision')
const foodRecommendation = require('../helper/zomato')

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
    const { description } = req.body
    let base64String = bufferToBase64.encode(req.file.buffer);
    restler.post('https://api.imgbb.com/1/upload', {
            multipart: true,
            data: {
                'key': 'e9061d427dc893cca88401e5c9628dd9',
                'image': base64String
            }
        }).on('complete', function(data, response) {
            let imgURL = data.data.url;
            let mood = ''
            console.log(imgURL);
            googleVision(imgURL)
              .then(result => {
                mood = result;
                
                const container = []
                foodRecommendation(result)
                .then(recommendation => {
                  if(recommendation.data.restaurants){
                    
                    for(let i = 0 ; i < 3 ; i++){
                        const obj = {
                          "name": recommendation.data.restaurants[i].restaurant.name,
                          "thumb": recommendation.data.restaurants[i].restaurant.thumb
                        }
                          container.push(obj)
                        }
                      }else{
                        let msg = {
                          msg : 'Data not found'
                        }
                        next(msg)
                      }

                    Photo.create({
                      link: imgURL,
                      description: mood,
                      UserId: req.userId 
      
                    })
                    .then(result => {
                        res.status(201).json({
                            container
                        })
                    })
                    .catch(next);
                  })
                  .catch(err => {
                    next(err)
                    
                  })
              })
              .catch(err => {
                next(err)
              })

            console.log(imgURL)
            

        }).on('fail', function(data, response) {
            let err = new Error();
            err.code = 400;
            err.message = 'Fail to upload';
            throw err;
        }).on('error', function(err, response) {
            err = new Error();
            err.code = 500;
            err.message = 'Internal Server Error';
            throw err;
        });
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