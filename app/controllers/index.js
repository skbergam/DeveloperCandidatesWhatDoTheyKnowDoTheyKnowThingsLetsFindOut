
// Hello World on 'GET /'
function root(req, res) {
  res.json({ message: 'Hello World' });
}

// Simulate a Failure on 'GET /fail'
function fail(req, res) {
  throw new Error('Hello Error');
}

// Check picks against winnings on 'POST /check'
function check(req, res) {
    throw new Error('Check');
}

// 404 Handler
function notFound(req, res) {
  const err = new Error('Not Found');
  err.status = 404;
  throw err;
}

module.exports = {
  root,
  fail,
  check,
  notFound
};
