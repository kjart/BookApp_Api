const errorHandler = (err, req, res, next) => {
  //Log to console for developer
  console.log(err.stack);

  res.status(err.statusCode || 500).json({
    suceess: false,
    error: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
