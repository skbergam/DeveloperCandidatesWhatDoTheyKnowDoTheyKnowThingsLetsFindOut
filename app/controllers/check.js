const moment = require('moment');
const fetch = require('node-fetch');

// Check picks against winnings on 'POST /check'
async function check(req, res) {
    validateRequestBody(req.body);

    const results = await fetchResults();

    res.send(JSON.stringify({ winnings: req.body.picks.map(p => comparePickToResults(results, p)) }));
}

function fetchResults() {
  return fetch("https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32")
    .then(r => r.json());
}

function comparePickToResults(results, pick) {
    const resultsOnDrawDate = results.filter(r => moment(r.resultsAnnouncedAt).isSame(pick.drawDate, 'day'));

    if (resultsOnDrawDate.length == 0) {
        return { status: "ERROR", message: `No game results found on specified 'drawDate': ${pick.drawDate}` };
    }

    if (resultsOnDrawDate.length > 1) {
        return { status: "ERROR", message: `Multiple game results found on specified 'drawDate': ${pick.drawDate}` };
    }

    return comparePickToResult(resultsOnDrawDate[0], pick);
}

function comparePickToResult(result, pick) {
    return {message: "Here's some results."};
}

const validations = [
  {
    predicate: body => !body,
    message: "Please specify a JSON request body.",
  },
  {
    predicate: body => !body.picks || !Array.isArray(body.picks) || !body.picks.length,
    message: "Please specify non-zero length array for 'picks' property.",
  },
  {
    predicate: body => hasInvalidPicks(body),
    message: "Please make sure each entry in 'picks' has valid 'drawDate' and 'numbers' properties.",
  },
];

function hasInvalidPicks(body) {
  return body.picks.some(p =>
    !p.drawDate
    || !moment(p.drawDate, "YYYY-MM-DD").isValid()
    || hasInvalidNumbers(p)
  );
}

function hasInvalidNumbers(pick) {
  if (!pick.numbers
      || !Array.isArray(pick.numbers)
      || pick.numbers.some(n => !n || typeof n.value != "number")) {
    return true;
  }

  const regularNumbers = pick.numbers.filter(n => !n.isPowerball);

  if (regularNumbers.length != 5
      || regularNumbers.some(n => n.value < 1 || n.value > 69)) {
    return true;
  }

  const powerballNumbers = pick.numbers.filter(n => n.isPowerball);

    if (powerballNumbers.length != 1
        || powerballNumbers.some(n => n.value < 1 || n.value > 26)) {
    return true;
  }
}

function validateRequestBody(body) {
    validations.forEach(v => {
      if (v.predicate(body)) {
          const err = new Error(`Invalid request: ${v.message}`);
          err.status = 400;
          throw err;
      }
    });
}

module.exports = {
  check
};
