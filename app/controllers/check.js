const moment = require('moment');
const fetch = require('node-fetch');

// Check picks against winnings on 'POST /check'
async function check(req, res) {
    validateRequestBody(req.body);

    const results = await fetchGameResults();

    const responseBody = computeTotalWinnings(results, req.body.picks);

    res.send(JSON.stringify(responseBody));
}

function fetchGameResults() {
  return fetch("https://games.api.lottery.com/api/v2.0/results?game=59bc2b6031947b9daf338d32")
    .then(r => r.json());
}

function computeTotalWinnings(results, picks) {
    const pickResults = picks.map(p => selectMatchingResultsAndComputeWinnings(results, p));
    const totalWinnings = (pickResults
        .filter(pr => pr.status === "OK")
        .map(pr => pr.winValue)
        .reduce((a, b) => a + b, 0)
    );

    return { totalWinnings, pickResults };
}

function selectMatchingResultsAndComputeWinnings(results, pick) {
    const resultsOnDrawDate = results.filter(r => moment(r.resultsAnnouncedAt).isSame(pick.drawDate, 'day'));

    if (resultsOnDrawDate.length == 0) {
        return { status: "ERROR", message: `No game results found on specified 'drawDate': ${pick.drawDate}` };
    }

    if (!resultsOnDrawDate[0].results) {
        return { status: "ERROR", message: `Results not announced yet for specified 'drawDate': ${pick.drawDate}` };
    }

    return { status: "OK", ...computeWinnings(resultsOnDrawDate[0], pick) };
}

function computeWinnings(result, pick) {
    const numberOfRegularMatches = 3;
    const isPowerballMatch = true;

    if (isPowerballMatch) {
        return {
            0: { isWin: true, winValue: 4 },
            1: { isWin: true, winValue: 4 },
            2: { isWin: true, winValue: 7 },
            3: { isWin: true, winValue: 100 },
            4: { isWin: true, winValue: 50000 },
            5: { isWin: true, winValue: result.prizes.values.filter(p => p.type === "JACKPOT")[0].value },
        }[numberOfRegularMatches];
    } else {
        return {
            0: { isWin: false, winValue: 0 },
            1: { isWin: false, winValue: 0 },
            2: { isWin: false, winValue: 0 },
            3: { isWin: true, winValue: 7 },
            4: { isWin: true, winValue: 100 },
            5: { isWin: true, winValue: 1000000 },
        }[numberOfRegularMatches];
    }
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
