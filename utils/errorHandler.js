//Export will allow to handle the server error.
module.exports = {
    genericError: (err, req, res, next) => {
      console.error(err.stack + '\n\n');
      
      // jwt authentication error
      if (err.name === 'UnauthorizedError')
        res.status(401).json({ message: 'Invalid Token' });
        
        res.status(500).json({message: 'Something broke!'});
    },
  
    customError: (err, req, res, next) => {
      console.log(err);
      res.status(err.status).send('Something broke!');
    }
  };
  