const jwt  = require('../helper/jwt');
const { User } = require('../models')

module.exports = function(req, res, next){
    
    try {
        const access_token = req.headers.access_token
        
        const decoded_token = jwt.vertifyToken(access_token);
        console.log(decoded_token)
        const {id, email} = decoded_token.token
        
        User.findOne({
            where: {
                email
            }
        })
        .then((result) => {
            
            if(result){
                req.userId = id
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
            console.log(err)
            next(err)
        });

    } catch (error) {
        const err = {
            status : 401,
            message : 'Invalid token or not provided, access prohibited!'
        }
        res.status(err.status).json({"Error message":err.message})
    }
    
    
}