#BlockIt

Promises are a great addition to Javascript, but if you're creating a lot of requests to a rate limited 
or fragile API, you need some throttling not offered out of the box by Promises. 

BlockIt offers ways of throttling Promises, either through executing your tasks 1 by 1 blocking style or
setting a timeout in between execution of tasks.