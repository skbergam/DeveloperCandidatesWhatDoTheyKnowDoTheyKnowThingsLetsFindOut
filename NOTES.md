# Assumptions

* README.md says:
  >...a Powerball lottery "ticket" includes one or more sets of "picks". Each "pick" is a set of 5 integers (from 1-69) along with a 6th integer (the Powerball, from 1-26) that the user has chosen to play during a specific draw."
  I assume from this that each "pick" should include a draw date for which to check for winnings.
* The "resultsAnnouncedAt" property of the game results object appears to be the best property to compare to draw date (when selecting which result to use to calculate winnings for given pick). Since it's specified in UTC and appears to always be at 3:59am, I'll consider it to actually be a draw for the previous calendar day since 3:59am UTC is somewhere between 7:59pm-11:59pm the previous day in the 4 major US time zones depending on daylight savings (and the README.md says it's a US lottery game).
* I assume I can ignore the "Power Play" value I see in the results data since it's not mentioned in the README.md.
* I assume the prize of type "JACKPOT" is the "grand prize" value for getting all 5 + 1 numbers correct.
* I assume it's OK to hard code the game rules for the sake of this exercise. I don't know how often they change.
* I assume the draw date specified on a pick is always going to be specified in UTC.

# Things I would do next if I had more time

* Use the jsonschema library to validate structure of requests (and to validate the game results we fetch). I would add validation to make sure picked numbers are integers as well.
* Cache game results data and pre-compute a dictionary for each one for quicker pick-number lookups.
* Async integration tests using ava (see comments in `test/app/controllers/check.test.js`).
* Add better request validation messages to help clients know what's wrong with their request.
