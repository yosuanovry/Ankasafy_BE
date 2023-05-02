const jwt = require('jsonwebtoken')

let key = process.env.JWT_KEY

const generateToken = (payload) => {
    const verifyOpts ={
        expiresIn : '365h'
    }
    const token = jwt.sign(payload,key,verifyOpts)
    return token
}

const refreshToken = (payload) => {
    const verifyOpts = {
        expiresIn: '365h'
    }
    const refreshToken = jwt.sign(payload,key,verifyOpts)
    return refreshToken
}

module.exports = {generateToken, refreshToken} 