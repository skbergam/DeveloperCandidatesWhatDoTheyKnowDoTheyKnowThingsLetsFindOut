# Interview Exercise

Your goal is to check-out and extend the functionality of this Node.js lottery application. 

Powerball is a popular US lottery game.  For the purposes of this exercise, a Powerball lottery ticket contains 1 to 5 sets of picks. 

Each pick is a set of 5 integers (from `1`-`69`) along with a 6th integer (the _Powerball_, from `1`-`26`). 

For example, a pick might be: 

`02 14 19 21 61` `25`

Your application's API will accept data for a lottery ticket, and respond with whether each pick has won, the prize won per-pick, and the total of all prizes won on the ticket.  It is up to you to design and build this API. 

As a bonus, your API can also return how many more $2 tickets the user might buy with their winnings. 

The Powerball winning numbers change regularly. In order to determine a win or a loss, your application will have to retrieve the latest Powerball winning numbers from the following URL: 

http://interview.api.lottery.com/powerball

To determine the prize, consult the prize matrix below: 

![](https://github.com/autolotto/interview/powerball_rules.png)


**Exercise Rules:**

- There is no time limit to this challenge. 
- You must use JavaScript and must extend this code-base. 
- Follow best practices and conventions to the best of your abilities.
- You are free to add packages or tools to your project as you see fit.
- You must submit your code via a GitHub repository. 
- We expect you to write the kind of feature you would put into production, including tests and documentation as you see fit.


## Download

To checkout the source, you can run: 

`git clone https://github.com/autolotto/interview.git`

## Installation

This app requires: 

- A Linux or MacOS Environment *(Windows Untested)*
- Node.js 8.9+

If you do not have node.js installed: 

1. [Install NVM](https://github.com/creationix/nvm#installation)
2. [Install Node 8.9](https://github.com/creationix/nvm#usage) `nvm install 8.9`
3. [Switch to Node 8.9](https://github.com/creationix/nvm#usage) `nvm use 8.9`

## Starting the App

From the checked-out application folder, run: 

`npm start`

You should see output like this: 

```
node index.js
App listening on port 3000
```

You can then hit the default endpoint: 

`http://localhost:3000/`

You should see something like this: 

```json
{
  "messsage": "Hello World"
}
```

To shutdown the server simply send a `^C`.

## Testing

To run the existing tests simply use: 

`npm test`

You should see output like this: 

```
> interview@1.0.0 test /Users/user/interview
> ava
 
  ✔ App Settings
  ✔ App Includes Not Found Handler
  ✔ App Includes Error Handler
 

  3 tests passed
 
```

## Contact

We encourage you to use your best discretion, but also to ask questions and communicate if you need it.  

If you have questions during the interview, call your HR contact or send a message to: 

- [engineering@lottery.com](mailto:engineering@lottery.com)



 
