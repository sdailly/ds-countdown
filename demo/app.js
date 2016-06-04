var Countdown = require('../lib/countdown.es6.js');

document.addEventListener('DOMContentLoaded', function() {
  new Countdown({
    id: "ds-Countdown",
    targetTime: '2017-01-01 00:00:00',
    afterEnd() {
      alert("Time over !")
    }
  });

}, false);
