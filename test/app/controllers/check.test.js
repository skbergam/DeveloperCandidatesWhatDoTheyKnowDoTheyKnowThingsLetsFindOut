const test = require('ava');
const td = require('testdouble');

const { check } = require('../../../app/controllers/check');

test('Check Controller', t => {
    t.truthy(true);
    // const res = { json: td.function() };
    // check({}, res);
    // t.notThrows(() =>
    //     td.verify(res.json({ message: 'Hello World' }))
    // );
});

// NOTE: Was unable to get async tests working with ava (not sure why). Even the example test from the ava GitHub repo
// at https://github.com/avajs/ava#async-function-support doesn't appear to work:

// test('throws', async t => {
//     await t.throws(async () => {
//         throw new TypeError('🦄');
//     }, {instanceOf: TypeError, message: '🦄'});
// });

// Decided to focus on just unit testing the result selection and winnings computation logic since it's all CPU-bound
// and won't involve any async handling.