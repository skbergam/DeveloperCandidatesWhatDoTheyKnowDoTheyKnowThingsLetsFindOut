const test = require('ava');
const { selectMatchingResultsAndComputeWinnings } = require('../../../app/services/compute');
const { resultsBody } = require('./stub-results');

test('No results for specified draw date', tc("2018-02-27", [12, 30, 59, 65, 69], 16, "ERROR", 0));
test('Results not announced yet for specified drawDate', tc("2018-03-17", [12, 30, 59, 65, 69], 16, "ERROR", 0));
test('0+0', tc("2018-02-28", [1, 2, 3, 4, 5], 1, "OK", 0));
test('1+0', tc("2018-02-28", [12, 2, 3, 4, 5], 1, "OK", 0));
test('2+0', tc("2018-02-28", [12, 30, 3, 4, 5], 1, "OK", 0));
test('3+0', tc("2018-02-28", [12, 30, 59, 4, 5], 1, "OK", 7));
test('4+0', tc("2018-02-28", [12, 30, 59, 65, 5], 1, "OK", 100));
test('5+0', tc("2018-02-28", [12, 30, 59, 65, 69], 1, "OK", 1000000));
test('0+1', tc("2018-02-28", [1, 2, 3, 4, 5], 16, "OK", 4));
test('1+1', tc("2018-02-28", [12, 2, 3, 4, 5], 16, "OK", 4));
test('2+1', tc("2018-02-28", [12, 30, 3, 4, 5], 16, "OK", 7));
test('3+1', tc("2018-02-28", [12, 30, 59, 4, 5], 16, "OK", 100));
test('4+1', tc("2018-02-28", [12, 30, 59, 65, 5], 16, "OK", 50000));
test('5+1', tc("2018-02-28", [12, 30, 59, 65, 69], 16, "OK", 293000000));

function tc(drawDate, numbers, powerballNumber, expectedStatus, expectedWinValue) {
    return t => {
        const pick = { drawDate, numbers: numbers.map(value => ({value})).concat([{value:powerballNumber,isPowerball:true}]) };
        const pickResult = selectMatchingResultsAndComputeWinnings(resultsBody, pick);

        t.is(pickResult.status, expectedStatus);
        t.is(pickResult.winValue, expectedWinValue);
        t.true(pickResult.isWin == pickResult.winValue > 0);
    };
}