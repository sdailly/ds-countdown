# ds-countdown

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
  separator: '/',
  afterEnd() {
    alert("Time over !")
  }
});
```

```html
<div id="ds-Countdown"></div>
<!-- or -->
<div id="ds-Countdown">00:00:00:00</div>
```

#### Options

- targetTime : string, format = yyyy-mm-dd hh:mm:ss (convert to timestamp)
- noDay : hide the variable Day and minutes are calculate with the number of days
- hideDayAtZero : Minutes are calculated on the number of day & hide the variable Day
- afterEnd : callback function initialize after the countdown reaches 00:00:00:00
- separator : use a custom separator
