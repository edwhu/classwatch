**For USC Student use!**
#Class Checker
Getting the class you want at the time you need is hard. Chances are,
that perfect 2 pm spot right after lunch is already taken by the other
students who continuously monitor the class spots.

Introducing **classcheck**, where the computer checks the class for you! Upon
a class opening, **classcheck** will automatically alert you via email so you
can grab that spot!

#Getting started:

##Step 1.
Fill in your preferences in the `src/account_details.js` file.

##Step 2.
I have written everything in ES6 so we will have to use Babel to transpile the code
into normal javascript. If you haven't already, install dependencies.
```
npm install
```
Then, run these commands.
```
npm run build
npm run start
```
Notice that `npm run start` will only run a single check. Meaning, for continuous checking,
you will have to either use a setInterval function and run it continuously on your computer
(gross), use a CRON job (i'm doing that), or host this on an external server that can
continuously run this script.
