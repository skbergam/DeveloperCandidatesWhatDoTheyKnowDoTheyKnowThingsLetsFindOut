
// Generic error handler middleware
function errorHandler(err, req, res, next) {
  if (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message, status });
    next(err);
  }
}

module.exports = {
  errorHandler
};
