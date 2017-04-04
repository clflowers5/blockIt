# BlockIt

Promises are a great addition to Javascript, but if you're creating a lot of requests to a rate limited 
or fragile API, you need some throttling not offered out of the box by Promises. 

BlockIt offers ways of throttling Promises, either through executing your tasks 1 by 1 blocking style or
setting a timeout in between execution of tasks.

## Usage

#### Import
```javascript
const blockIt = require('../blockIt').blockIt;
const stallIt = require('../blockIt').stallIt;
const paceIt = require('../blockIt').paceIt;
```

#### blockIt
Each array item is passed into awesomeFunction synchronously,
the next item doesn't execute until the previous resolves.
```javascript
const awesomeFunction = () => Promise.resolve();
const awesomeArr = ['first', 'second'];

blockIt(awesomeFunction, awesomeArr)
    .then((result) => {
        // Do something awesome with your result
    });
```

#### stallIt
A provided interval is used as a wait time in-between function
executions.
```javascript
// Pass the next array item into the function every half-second
stallIt(awesomeFunction, awesomeArr, 500)
    .then((result) => {
        // Do more awesome stuff with your result
    });
```

#### paceIt
Similar to ```stallIt```, but instead of an interval pass in
the desired amount of executions to allow per second. Useful for
rate limited API's.
```javascript
// perform 20 awesomeFunctions a second
paceIt(awesomeFunction, awesomeArr, 20)
    .then((result) => {
        // Fickle API limits? Have no fear!
    });
```