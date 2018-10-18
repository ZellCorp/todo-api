//Export will allow to handle the server error.
module.exports = {
    genericError: (error, req, res, next) => {
      switch (error.name) {
        case 'UnauthorizedError':// jwt authentication error
          res.status(401).json(error);
          break;
        case 'internalServerError':// jwt authentication error
          res.status(500).json({ message: error.message });
          break;
        default:
          break;
      }
    },
  
    customError: (err, req, res, next) => {
      console.log(err);
      res.status(err.status).send('Something broke!');
    }
  };
  