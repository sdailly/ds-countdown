(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Countdown = function () {
  function Countdown(options) {
    var _this = this;

    _classCallCheck(this, Countdown);

    if (!options.targetTime || !options.id) {
      console.error("Countdown : Date is not defined");
    }

    this.el = document.getElementById(options.id);
    this.now = new Date().getTime();
    this.targetTime = new Date(options.targetTime).getTime();
    this.afterEnd = options.afterEnd;
    if (options.separator === false) {
      this.separator = "";
    } else {
      this.separator = options.separator && typeof options.separator == "string" ? options.separator : ":";
    }
    this.hideDayAtZeroOpts = options.hideDayAtZero || false;
    this.noDay = options.noDay || false;

    if (this.now > this.targetTime) {
      console.warn("Countdown : Date defined > Date now");
      return;
    }

    this.refresh();
    this.interval = setInterval(function () {
      _this.refresh();
    }, 1000);
  }

  _createClass(Countdown, [{
    key: "refresh",
    value: function refresh() {
      this.now = new Date().getTime();

      if (this.now > this.targetTime) {
        clearInterval(this.interval);
        if (this.afterEnd) this.afterEnd();
        return;
      }

      this.defineTimer();
      this.render();
    }
  }, {
    key: "hideDayAtZero",
    value: function hideDayAtZero() {
      if (this.hideDayAtZeroOpts && this.timer.day == 0) {
        return true;
      }
    }
  }, {
    key: "defineTimer",
    value: function defineTimer() {
      this.timer = {};
      var tmp = this.targetTime - this.now;
      tmp = Math.floor(tmp / 1000);
      this.timer.sec = tmp % 60;
      this.timer.sec = this.timer.sec < 10 ? "0" + this.timer.sec : this.timer.sec;

      tmp = Math.floor((tmp - this.timer.sec) / 60);
      this.timer.min = tmp % 60;
      this.timer.min = this.timer.min < 10 ? "0" + this.timer.min : this.timer.min;

      tmp = Math.floor((tmp - this.timer.min) / 60);
      this.timer.hour = this.noDay ? tmp : tmp % 24;
      this.timer.hour = this.timer.hour < 10 ? "0" + this.timer.hour : this.timer.hour;

      if (this.noDay) return;
      tmp = Math.floor((tmp - this.timer.hour) / 24);
      this.timer.day = tmp;
      if (this.hideDayAtZero()) return;
      this.timer.day = this.timer.day < 10 ? "0" + this.timer.day : this.timer.day;
    }
  }, {
    key: "render",
    value: function render() {
      var tplDay = "" + this.timer.day + this.separator;
      var tpl = "" + this.timer.hour + this.separator + this.timer.min + this.separator + this.timer.sec;

      this.el.innerHTML = this.hideDayAtZero() || this.noDay ? tpl : tplDay + tpl;
    }
  }]);

  return Countdown;
}();

// new Countdown({
//   id: "ds-Countdown",
//   targetTime: '2017-01-01 00:00:00',
//   noDay: false,
//   hideDayAtZero: false,
//   afterEnd: function() {
//     alert("Time over !")
//   }
// });

},{}]},{},[1]);
