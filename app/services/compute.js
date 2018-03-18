const moment = require('moment-timezone');

function selectMatchingResultsAndComputeWinnings(results, pick) {
    // We parse the draw date on the request as the Eastern US time zone.
    const drawDateForComparison = moment.tz(pick.drawDate, "America/New_York");

    // We convert the 'resultsAnnouncedAt' value to Eastern US as well to get a valid comparison. This assumes
    // the 'resultsAnnouncedAt' is on the same calendar day in the Eastern US time zone as the "draw date".
    const resultsOnDrawDate = results.filter(r =>
        moment(r.resultsAnnouncedAt)
            .tz("America/New_York")
            .isSame(drawDateForComparison, 'day'));

    if (resultsOnDrawDate.length == 0) {
        return { status: "ERROR", message: `No game results found on specified 'drawDate': ${pick.drawDate}` };
    }

    if (!resultsOnDrawDate[0].results) {
        return { status: "ERROR", message: `Results not announced yet for specified 'drawDate': ${pick.drawDate}` };
    }

    return { status: "OK", ...computeWinnings(resultsOnDrawDate[0], pick), res: resultsOnDrawDate[0] };
}

function computeWinnings(result, pick) {
    // This could be optimized to only loop through the 'pick.numbers' and 'result.results.values' arrays once each.
    const numberOfRegularMatches = pick.numbers.filter(n =>
        !n.isPowerball
        && result.results.values.some(v =>
            v.type === "NUMBER"
            && !v.name
            && Number(v.value) === n.value)).length;

    const isPowerballMatch = pick.numbers.some(n =>
        n.isPowerball
        && result.results.values.some(v =>
            v.type === "NUMBER"
            && v.name === "Powerball"
            && Number(v.value) === n.value));

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

module.exports = {
    selectMatchingResultsAndComputeWinnings
};
