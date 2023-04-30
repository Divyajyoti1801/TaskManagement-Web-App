const ErrorMiddleware = (err, req, res, next) => {
  err.message = err.message || `Internal Server Error`;
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    error: err.message,
  });
};

export default ErrorMiddleware;
