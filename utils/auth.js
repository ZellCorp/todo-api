const config = require('../config/config');
const fs = require('fs');
var publicKEY  = fs.readFileSync('./config/public.key', 'utf8');

module.exports = {
    checkTokenPresence: (request) => {
        // Authorization: Bearer g1jipjgi1ifjioj
        // Handle token presented as a Bearer token in the Authorization header
        if (request.headers.authorization 
            && request.headers.authorization.split(' ')[0] === 'Bearer')
        return request.headers.authorization.split(' ')[1];   
        // Handle token presented as URI param
        else if (request.query && request.query.token) 
            return request.query.token;
        // Handle token presented as a cookie parameter
        else if (request.cookies && request.cookies.token) 
            return request.cookies.token;
        throw ("no token found");  
    },

    checkToken:(request) => {
        checkTokenPresence(request).then((token)=>{
            return jwt.verify(token, config.secret, config.jwtVerifyOption);
        })
        .catch((error)=>{
            console.log(error)
        });
    }
}