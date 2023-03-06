const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const AuthMiddleware = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: decodedToken.id })        
      
        if (!user) {
            throw new Error('Error, Please Authenticate')
        }

        req.user = user
        req.token = token

        next()
        
    } catch (err) {

        res.status(401).send({ error : 'You need to Authenticate'})

    }
}

module.exports =  {
    AuthMiddleware : AuthMiddleware
}