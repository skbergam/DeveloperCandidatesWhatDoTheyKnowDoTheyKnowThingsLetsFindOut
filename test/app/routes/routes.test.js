const test = require('ava');

const router = require('../../../app/routes');

test('Router Setup', t => {
  const routes = router.stack
    .filter(layer => layer.route)
    .map(layer => layer.route.path);

  t.true(routes.includes('/'));
  t.true(routes.includes('/fail'));
});

