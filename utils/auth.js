const config = require('../config/config');
const fs = require('fs');
var publicKEY  = fs.readFileSync('./config/public.key', 'utf8');
var jwt = require('jsonwebtoken');

checkTokenPresence = (request) => {
    return new Promise((resolve,reject) => {
        // Authorization: Bearer g1jipjgi1ifjioj
        // Handle token presented as a Bearer token in the Authorization header
        if (request.headers.authorization 
            && request.headers.authorization.split(' ')[0] === 'Bearer')
            resolve(request.headers.authorization.split(' ')[1]);   
        // Handle token presented as URI param
        else if (request.query && request.query.token) 
            resolve(request.query.token);
        // Handle token presented as a cookie parameter
        else if (request.cookies && request.cookies.token) 
            resolve(request.cookies.token);
        reject("no token found"); 
    });
},

checkToken = (request) => {
    return new Promise((resolve, reject) => {
        checkTokenPresence(request).then((token)=>{
            jwt.verify(token, publicKEY, config.jwtVerifyOption,(err, decoded)=>{
                if(err) reject(err);
                resolve(decoded);
            });
        })
        .catch((error)=>{
            reject(error);
        });
    })
}

checkUser = (req, res, next) => {
    if ( req.url == '/auth/login') 
        return next();
    checkToken(req)
    .then(()=>next())
    .catch(()=>res.redirect('/auth/login'));
}

module.exports = {
    checkTokenPresence,
    checkToken,
    checkUser
}