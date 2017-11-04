const test = require('ava');
const td = require('testdouble');

const { errorHandler } = require('../../../app/middleware/errors');

test('Error Handler Middleware', t => {

  const err = new Error('Test Error');

  const res = { json: td.function({}), status: td.function(500) };
  td.when(res.status(500)).thenReturn(res);

  const next = td.function(err);

  // Run Controller
  errorHandler(err, {}, res, next);

  t.notThrows(() =>
    td.verify(res.json({ error: err.message, status: 500 }))
  );

  t.notThrows(() =>
    td.verify(next(err))
  );
});

test('Error Handler for NotFound Case', t => {

  const err = new Error('Not Found');
  err.status = 404;

  const res = { json: td.function({}), status: td.function(404) };
  td.when(res.status(404)).thenReturn(res);

  const next = td.function(err);

  // Run Controller
  errorHandler(err, {}, res, next);

  t.notThrows(() =>
    td.verify(res.json({ error: err.message, status: 404 }))
  );
  t.notThrows(() =>
    td.verify(next(err))
  );
});
