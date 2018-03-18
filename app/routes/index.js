const router = require('express-promise-router')();

// Controller Functions
const { root, fail, check, notFound } = require('../controllers/index');

// Routes
router.get('/', root);
router.get('/fail', fail);
router.post('/check', check);

// Fall Through Route
router.use(notFound);

module.exports = router;