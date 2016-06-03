# ds-countdown
=====================

#### Install via npm ####

```
npm i -S ds-countdown
```

#### A simple countdown  ####
Example
---------------

```javascript
new Countdown({
  id: "ds-Countdown",
  targetTime: '2017-01-01 00:00:00',
  noDay: false,
  hideDayAtZero: false,
  afterEnd: function() {
    alert("Time over !")
  }
});
```
