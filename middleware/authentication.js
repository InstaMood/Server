'use strict'

const jwt  = require('jsonwebtoken');
const { User } = require('../models')

module.exports = function(req, res, next){
    
    try {
        console.log(req);
        
        const access_token = req.headers.access_token
        
        const decoded_token = jwt.verify(access_token, process.env.SECRET);
        const {id, email} = decoded_token.id
        
        User.findOne({
            where: {
                id,
                email
            }
        })
        .then((result) => {
            
            if(result){
                req.headers.userId = id
                next()
                return null
            }else{
                const error = {
                    status : 401,
                    message : `User forbidden access!`
                }
                throw error
            }
        }).catch((err) => {
            res.status(err.status).json({"Error message":err.message})
        });

    } catch (error) {
        const err = {
            status : 401,
            message : 'Invalid token or not provided, access prohibited!'
        }
        res.status(err.status).json({"Error message":err.message})
    }
    
    
}