'use strict';

function throttle (fn, delay){

  var output = null,
      time;
  return function () {

    var cTime = new Date();
    if (cTime - time < delay) return output;
    time = cTime;
    output = fn.apply(this, arguments);
    return output;
  };
}

var counter = (function(){
  var myCount = 0;
  return function(){ return myCount++; };
}()),
slowCounter = throttle(counter, 25),
startTime = Date.now(),
prev = -Infinity,
now = 0,
results = [];
while(Date.now() - startTime < 99){
  now = slowCounter();

  if(now !== prev){
    console.log(Date.now()-startTime);
    prev = now;
    results.push(now);
  }
}

console.log(results);
