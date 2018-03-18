const router = require('express-promise-router')();

// Controller Functions
const { root, fail, notFound } = require('../controllers/index');
const { check } = require('../controllers/check');

// Routes
router.get('/', root);
router.get('/fail', fail);
router.post('/check', check);

// Fall Through Route
router.use(notFound);

module.exports = router;